require('dotenv').config();
import express from 'express';
import { Request, Response } from 'express';
import jwtDecode from 'jwt-decode';
import { TokenSet } from 'openid-client';
import { XeroAccessToken, XeroIdToken, XeroClient, Account, AccountType } from 'xero-node';
import mongoose from 'mongoose';
import { tokenModel } from './models/token';
import { Detail } from './models/accountdetails';
const session = require('express-session');
const ur = 'mongodb+srv://saketh-admin:chutiyap@cluster0.auzn1.mongodb.net/accountsDB';

const client_id: string = process.env.CLIENT_ID;
const client_secret: string = process.env.CLIENT_SECRET;
const redirectUrl: string = process.env.REDIRECT_URI;
const scopes: string = 'openid profile email accounting.settings accounting.reports.read accounting.journals.read accounting.contacts accounting.attachments accounting.transactions offline_access';

const xero = new XeroClient({
	clientId: client_id,
	clientSecret: client_secret,
	redirectUris: [redirectUrl],
	scopes: scopes.split(' ')
});

if (!client_id || !client_secret || !redirectUrl) {
	throw Error('Environment Variables not all set - please check your .env file in the project root or create one!')
}

const app: express.Application = express();

app.use(express.static(__dirname + '/build'));
app.use(session({
	secret: 'something crazy',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false },
}));
mongoose.connect(ur, { useNewUrlParser: true, useFindAndModify: false });  // i will give the mongodb server url
mongoose.set("useCreateIndex", true);
const authenticationData: any = (req: Request, res: Response) => {
	return {
		decodedIdToken: req.session.decodedIdToken,
		decodedAccessToken: req.session.decodedAccessToken,
		tokenSet: req.session.tokenSet,
		allTenants: req.session.allTenants,
		activeTenant: req.session.activeTenant,
	};
};
app.get('/', (req: Request, res: Response) => {
	res.redirect('/connect');
});

app.get('/connect', async (req: Request, res: Response) => {
	try {
		const consentUrl: string = await xero.buildConsentUrl();
		res.redirect(consentUrl);
	} catch (err) {
		res.send('Sorry, something went wrong');
	}
});
// const get = async () => {
// 	let data;
// 	await tokenModel.findOne({ _id: "604b1b466a94e27728a7d3da" }, function (err, found) {
// 		if (err) {
// 			console.log(err);

// 		} else {
// 			data = {
// 				id_token: found.id_token,
// 				access_token: found.access_token,
// 				expires_at: found.expires_at,
// 				token_type: found.token_type,
// 				refresh_token: found.refresh_token,
// 				scope: found.scope,
// 				session_state: found.session_state
// 			}
// 		}
// 	});
// 	return data;
// }
app.get('/callback', async (req: Request, res: Response) => {
	try {
		// const tokenSet: TokenSet = await get();
		const tokenSet: TokenSet = await xero.apiCallback(req.url);
		const newXeroClient = new XeroClient()
		const refreshedTokenSet = await newXeroClient.refreshWithRefreshToken(client_id, client_secret, tokenSet.refresh_token)
		// const tokenwa = new tokenModel(tokenSet);
		// console.log(tokenwa);
		// console.log(TokenSet);
		// console.log(tokenSet);
		// await tokenwa.save();
		await xero.updateTenants();
		const decodedIdToken: XeroIdToken = jwtDecode(tokenSet.id_token);
		const decodedAccessToken: XeroAccessToken = jwtDecode(tokenSet.access_token);
		req.session.decodedIdToken = decodedIdToken;
		req.session.decodedAccessToken = decodedAccessToken;
		req.session.tokenSet = tokenSet;
		req.session.allTenants = xero.tenants;
		// XeroClient is sorting tenants behind the scenes so that most recent / active connection is at index 0
		req.session.activeTenant = xero.tenants[0];
		const authData: any = authenticationData(req, res);
		// res.send(authData);
		res.redirect('/organisation');
	} catch (err) {
		res.send('Sorry, something went wrong');
	}
});

app.get('/organisation', async (req: Request, res: Response) => {
	try {
		// const tokenSet: TokenSet = await get();
		const tokenSet: TokenSet = await xero.readTokenSet();
		console.log(tokenSet);

		// console.log(tokenSet.expired() ? 'expired' : 'valid');
		const response: any = await xero.accountingApi.getOrganisations(req.session.activeTenant.tenantId);
		res.send(`Hello, ${response.body.organisations[0].name}`);
	} catch (err) {
		res.send('Sorry, something went wrong');
	}
});
app.get("/journals", async (req: Request, res: Response) => {
	try {
		//GET ALL
		const apiResponse = await xero.accountingApi.getJournals(req.session.activeTenant.tenantId);
		res.json(apiResponse.body);
		apiResponse.body.journals.forEach((journal) => {
			journal.journalLines.forEach((line) => {
				let s: string;
				if (line.grossAmount < 0) {
					s = "credit";
				} else {
					s = "debit";
				}
				const data = new Detail({
					account_name: line.accountName,
					account_id: line.accountID,
					amount: line.grossAmount,
					date: journal.journalDate,
					type: s
				})
				data.save();
			})
		})
		// res.render("journals", {
		// 	consentUrl: await xero.buildConsentUrl(),
		// 	authenticated: this.authenticationData(req, res),
		// 	journals: apiResponse.body.journals
		// });
	} catch (e) {
		res.status(res.statusCode);
		// res.render("shared/error", {
		// 	consentUrl: await xero.buildConsentUrl(),
		// 	error: e
		// });
	}
});
app.get("/accounts", async (req: Request, res: Response) => {
	try {
		const accountsGetResponse = await xero.accountingApi.getAccounts(req.session.activeTenant.tenantId);
		res.send(accountsGetResponse.body);
	} catch (e) {
		console.log(e);

	}
});
app.get('/accountById/:accountId', async (req: Request, res: Response) => {
	try {
		const accountId = req.params.accountId;
		const accountGetResponse = await xero.accountingApi.getAccount(req.session.activeTenant.tenantId, accountId);
		res.send(accountGetResponse.body);
	} catch (error) {
		console.log(error);
	}
});
app.post('/createAccount', async (req: Request, res: Response) => {
	try {
		const account: Account = { name: req.body.name, code: "c:" + 36542, type: AccountType.EXPENSE, hasAttachments: true };
		const accountCreateResponse = await xero.accountingApi.createAccount(req.session.activeTenant.tenantId, account);
		res.send(accountCreateResponse.body);
	} catch (error) {
		console.log(error);
	}
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});