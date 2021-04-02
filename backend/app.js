require('dotenv').config();
const express = require('express')
const cron = require('node-cron')
const jwtDecode = require('jwt-decode');
const oc = require('openid-client')
const xeroNode = require('xero-node');
const OAuthClient = require('intuit-oauth');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken')
const session = require('express-session');
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const User = require('./models/userreg.js');
const Tokenwa = require('./models/tokenset.js');
const Journal = require('./models/journalschema.js');
const bcrypt = require("bcrypt");
const cors = require('cors');
const journal = require('./models/journalschema.js');
//const requireAuth=require('./middleware/authMiddleware');

const app = express()
const SECRETKEY = process.env.SECRET;

// mongoose.connect("mongodb://piyush:piyush@cluster0-shard-00-00.ah8p2.mongodb.net:27017,cluster0-shard-00-01.ah8p2.mongodb.net:27017,cluster0-shard-00-02.ah8p2.mongodb.net:27017/login?ssl=true&replicaSet=atlas-135f4d-shard-0&authSource=admin&retryWrites=true&w=majority",
// {
//     useNewUrlParser:true,
//     useUnifiedTopology: true
// });

mongoose.connect(process.env.URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DATABASE CONNECTED");
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirectUrl = process.env.REDIRECT_URI;
const scopes = 'openid profile email accounting.settings accounting.reports.read accounting.journals.read accounting.contacts accounting.attachments accounting.transactions offline_access';
const xero = new xeroNode.XeroClient({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUris: [redirectUrl],
    scopes: scopes.split(' ')
});
const oauthClient = new OAuthClient({
    clientId: process.env.QCLIENTID,
    clientSecret: process.env.QCLIENTSECRET,
    environment: 'sandbox',
    redirectUri: process.env.QCALLBACK,
});
let oauth2_token_json;
app.use(session({
    secret: 'something crazy',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
const verifyToken = (req, res, next) => {
    try {
        const bearer = req.headers.authorization;
        if (bearer) {
            const bearerToken = bearer.split(" ");
            const token = bearerToken[1];
            //  console.log(token);
            jwt.verify(token, SECRETKEY, (err, decoded) => {
                // console.log(token);
                if (err) {
                    res.json(false)
                }
                else {
                    req.userData = decoded;
                    //  console.log(token);
                    next();
                }
            });
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        console.log(err.message);
    }
}

app.post("/delete-user", (req, res) => {

    console.log("user data", req.userData)
    res.send("user deleted")
})

// app.post("/login", (req,res)=>{
//     console.log(req.body)
//    const { username , password} = req.body;

//     if(username==="piyush" && password==="piyush"){
//         const user ={
//             username,
//             age:22
//         }
//         jwt.sign({user},SECRETKEY,(err,token) => {
//         if(err){
//             res.sendStatus(403)
//         }else{
//             res.json({
//                 token
//             })
//         }
//     })
// }else{
//     res.sendStatus(403)
// }
// })
// app.post('/new',verifyToken,(req,res)=>{
//     console.log(req.body);
//     res.send("hi");
// })

app.post('/check', verifyToken, (req, res) => {

    // res.sendStatus(403)
    //  console.log("hi");
    res.json(true)
})

app.post('/logout', verifyToken, (req, res) => {
    console.log("logout");
})
let id = null;
let id2 = null;
app.post('/ck', verifyToken, async (req, res) => {
    try {
        if (id == null || id2 == null) {
            console.log(id, id2);
            res.json(false);
        }
        else {
            console.log(id, id2);
            res.json(true);
        }
    } catch (error) {
        console.log(error);
    }
    // const tokenSet = new oc.TokenSet(found);
    // if (tokenSet.expired()) {
    //     res.json(false);
    // } else {
    //     console.log(tokenSet.expired());
    //     res.json(false);
    // }
    // tokenSet = await xero.readTokenSet();
    // console.log("hi");
    // await Tokenwa.findOne({ _id: '60620d47001d4a3e7c9a7f51' }, (err, found) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         return found;
    //     }
    // })
    //     .then(found => {
    //         try {
    //             let tokenSet = new oc.TokenSet(found);
    //             if (tokenSet.expired()) {
    //                 res.json(false);
    //             } else {
    //                 console.log(tokenSet);
    //                 res.json(true);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //         // const tokenSet = new oc.TokenSet(found);
    //         // if (tokenSet.expired()) {
    //         //     res.json(false);
    //         // } else {
    //         //     console.log(tokenSet.expired());
    //         //     res.json(false);
    //         // }
    //         // tokenSet = await xero.readTokenSet();
    //     })

    // const tokensave = new Tokenwa(tokenSet);
    // tokensave.save(err => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(tokenSet);
    //         res.json(false);
    //     }
    // });

    // if (tokenSet == null) {
    //     res.json(false);
    // } else {
    //     console.log(tokenSet);
    //     res.json(false);
    // }
    // console.log(tokenSet);
})
const getData = async (od, vob, limit, page) => {
    let ar = [];
    let order;
    let field;
    if (vob == 'id') {
        field = 'Account_id'
    }
    if (vob == 'name') {
        field = 'Account_name'
    }
    if (vob == 'amount') {
        field = 'Amount'
    }
    if (vob == 'date') {
        field = 'Date'
    }
    if (vob == 'type') {
        field = 'Type'
    }
    if (od == 'asc') {
        order = 1;
    } else if (od == 'desc') {
        order = -1;
    } else {
        await Journal.find()
            .limit(limit * 1)
            .skip(page * limit)
            .exec()
            .then((journals) => {
                journals.forEach((item) => {
                    const jbody = {
                        name: item.Account_name,
                        id: item.Account_id,
                        amount: item.Amount,
                        date: item.Date,
                        type: item.Type
                    }
                    ar.push(jbody);
                })
            });
        // console.log(ar);
        return ar;
    }
    await Journal.find()
        .limit(limit * 1)
        .skip(page * limit)
        .sort({ [field]: order })
        .exec()
        .then((journals) => {
            journals.forEach((item) => {
                const jbody = {
                    name: item.Account_name,
                    id: item.Account_id,
                    amount: item.Amount,
                    date: item.Date,
                    type: item.Type
                }
                ar.push(jbody);
            })
        });
    // console.log(ar);
    return ar;
}
const getDatu = async (od, vob, limit, page, ctq, query) => {
    let ar = [];
    let order;
    let field;
    let qfield;
    if (ctq == 'Date') {
        qfield = 'Date'
    }
    if (ctq == 'Type') {
        qfield = 'Type'
    }
    if (ctq == 'AccountName') {
        qfield = 'Account_name'
    }
    if (vob == 'id') {
        field = 'Account_id'
    }
    if (vob == 'name') {
        field = 'Account_name'
    }
    if (vob == 'amount') {
        field = 'Amount'
    }
    if (vob == 'date') {
        field = 'Date'
    }
    if (vob == 'type') {
        field = 'Type'
    }
    if (od == 'asc') {
        order = 1;
    } else if (od == 'desc') {
        order = -1;
    } else {
        await Journal.find()
            .limit(limit * 1)
            .skip(page * limit)
            .exec()
            .then((journals) => {
                journals.forEach((item) => {
                    const jbody = {
                        name: item.Account_name,
                        id: item.Account_id,
                        amount: item.Amount,
                        date: item.Date,
                        type: item.Type
                    }
                    ar.push(jbody);
                })
            });
        // console.log(ar);
        return ar;
    }
    await Journal.find({ [qfield]: query })
        .limit(limit * 1)
        .skip(page * limit)
        .sort({ [field]: order })
        .exec()
        .then((journals) => {
            journals.forEach((item) => {
                const jbody = {
                    name: item.Account_name,
                    id: item.Account_id,
                    amount: item.Amount,
                    date: item.Date,
                    type: item.Type
                }
                ar.push(jbody);
            })
        });
    // console.log(ar);
    return ar;
}
app.post('/all', verifyToken, async (req, res) => {
    console.log(req.body);
    // let ar = [];
    const limit = req.body.rowsPerPage;
    const page = req.body.page;
    const query = req.body.query;
    const columnToQuery = req.body.columnToQuery;
    const orderDirection = req.body.orderDirection;
    const valueToOrderBy = req.body.valueToOrderBy;
    if (query == '') {
        const data = await getData(orderDirection, valueToOrderBy, limit, page);
        res.send(data);
    } else {
        const data = await getDatu(orderDirection, valueToOrderBy, limit, page, columnToQuery, query);
        res.send(data);
    }

    // await Journal.paginate({}, options, (err, found) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         if (found.length >= 1) {
    //             found.forEach((item) => {
    //                 const jbody = {
    //                     name: item.Account_name,
    //                     id: item.Account_id,
    //                     amount: item.Amount,
    //                     date: item.Date,
    //                     type: item.Type
    //                 }
    //                 ar.push(jbody);
    //             })
    //         } else {
    //             res.status(404).json({ message: 'No docs found for the request' });
    //         }
    //     }
    // })
    //     .then(async (response) => {
    //         res.send(ar);
    //     })
    // res.send(json);
    // const test =
    //     [
    //         {
    //             name: "piyush",
    //             id: "2123",
    //             amount: 4158,
    //             date: "2000-09-12",
    //             type: "credit"
    //         },
    //         {
    //             name: "aman",
    //             id: "3123",
    //             amount: 1234,
    //             date: "2000-09-11",
    //             type: "credit"
    //         },
    //         {
    //             name: "amar",
    //             id: "4123",
    //             amount: 7890,
    //             date: "2000-01-01",
    //             type: "credit"
    //         },
    //         {
    //             name: "xyz",
    //             id: "1523",
    //             amount: 4122,
    //             date: "1999-11-11",
    //             type: "credit"
    //         },
    //         {
    //             name: "abc",
    //             id: "1623",
    //             amount: 9999,
    //             date: "2005-11-15",
    //             type: "credit"
    //         },
    //         {
    //             name: "rahul",
    //             id: "1232",
    //             amount: 2389,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "qqq",
    //             id: "1222",
    //             amount: 1010,
    //             date: "2011-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "rrr",
    //             id: "1256",
    //             amount: 1111,
    //             date: "1990-09-12",
    //             type: "credit"
    //         },
    //         {
    //             name: "zzz",
    //             id: "1231",
    //             amount: 3412,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "rah",
    //             id: "1247",
    //             amount: 9234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "ahul",
    //             id: "1270",
    //             amount: 2340,
    //             date: "2010-09-12",
    //             type: "credit"
    //         },
    //         {
    //             name: "raul",
    //             id: "1236",
    //             amount: 2234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "rahl",
    //             id: "1235",
    //             amount: 5234,
    //             date: "2010-09-12",
    //             type: "credit"
    //         },
    //         {
    //             name: "racvsdfsdf",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "rahcxvxvcx",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "dfsdvcxvv",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "rahcsvvcvdf",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "rasdfsdfsd",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "rasdfsdfsdgfg",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "rahdfsdfgd",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "rasdvdfvfd",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "rdsffsdd",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "sdfdsgdfgf",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "rffsfdsv",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "dfgdfg",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },
    //         {
    //             name: "dfgddfg",
    //             id: "1237",
    //             amount: 1234,
    //             date: "2010-09-12",
    //             type: "debit"
    //         },

    //     ]

})

app.post('/register', async (req, res) => {
    User.findOne({ username: req.body.username }, (err, found) => {
        if (err) {
            console.log(err);
        } else {
            if (found) {
                return res.status(409).send(false);
            } else {
                if (req.body.password.length < 6) {
                    return res.send('Password length should be greater than 6 characters')
                }
                else if (req.body.password != req.body.confirmPassword) {
                    return res.send('Password doesn\'t match');
                }
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) {
                        console.log(err);
                    } else {
                        const user = {
                            firstname: req.body.FirstName,
                            lastname: req.body.LastName,
                            username: req.body.username,
                            password: hash
                        }
                        const newUser = new User(user);
                        newUser.save(err => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.status(200).send(true);
                            }
                        });
                    }
                });
            }
        }
    })
    // try{
    //     const salt=await bcrypt.genSalt(10)
    //     const hashPassword=await bcrypt.hash(req.body.password,salt)
    //     const user={username:req.body.username,password:hashPassword}
    //     const newUser=await new User(user);
    //    await newUser.save();
    // //  const  token=jwt.sign({username:user.username});
    //    res.send("ok");
    // }
    // catch{
    //     console.log(error);
    //     res.send(error);
    // }
    // console.log(req.body);
    // res.send(true);
})
app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    // console.log(req.body)
    User.findOne({ username: username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.sendStatus(403)
                    }
                    if (result) {
                        //  console.log(username);
                        token = jwt.sign({ username: username }, SECRETKEY);
                        // res.setHeader('Authorization', token);
                        res.json({
                            message: 'login',
                            token
                        })
                    } else {
                        res.sendStatus(403)
                    }
                })
            } else {
                res.sendStatus(403)
            }
        })
})
app.post('/xero/login', verifyToken, (req, res, next) => {
    res.redirect('/connect');
})
app.get('/connect', verifyToken, async (req, res, next) => {
    try {
        const consentUrl = await xero.buildConsentUrl();
        // console.log(consentUrl);
        res.json(consentUrl);
    } catch (err) {
        res.send('Sorry, something went wrong');
    }
})
app.get('/callback', async (req, res) => {
    try {

        const tokenSet = await xero.apiCallback(req.url);
        await Tokenwa.findOneAndUpdate(null, {
            id_token: tokenSet.id_token,
            access_token: tokenSet.access_token,
            expires_at: tokenSet.expires_at,
            token_type: tokenSet.token_type,
            refresh_token: tokenSet.refresh_token,
            scope: tokenSet.scope
        }, null, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                return result;
            }
        })
            .then(async (result) => {
                const newXeroClient = new xeroNode.XeroClient();
                const refreshedTokenSet = await newXeroClient.refreshWithRefreshToken(client_id, client_secret, tokenSet.refresh_token);
                await xero.updateTenants();
                const decodedIdToken = jwtDecode(tokenSet.id_token);
                const decodedAccessToken = jwtDecode(tokenSet.access_token);
                req.session.decodedIdToken = decodedIdToken;
                req.session.decodedAccessToken = decodedAccessToken;
                req.session.tokenSet = tokenSet;
                req.session.allTenants = xero.tenants;
                req.session.activeTenant = xero.tenants[0];
                id = req.session.activeTenant.tenantId;
                res.redirect('http://localhost:3000/homepage');
            })

    } catch (err) {
        res.redirect('http://localhost:3000/homepage');
    }
});
app.post('/quickbooks/login', verifyToken, async (req, res, next) => {
    const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
        state: 'intuit-test'
    });
    res.json(authUri);
})
app.get('/qcallback', function (req, res) {
    oauthClient
        .createToken(req.url)
        .then(function (authResponse) {
            oauth2_token_json = authResponse.getJson();
            // const newToken = new qtokenSet(oauth2_token_json);
            // newToken.save(err => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         res.send(JSON.stringify(oauth2_token_json));
            //     }
            // });
            // // res.send(JSON.stringify(oauth2_token_json));
            // next();
            id2 = oauthClient.getToken().realmId;
            res.redirect('http://localhost:3000/homepage')
        })
        .catch(function (e) {
            res.redirect('http://localhost:3000/homepage')
        });
});
const getxerojournals = async () => {
    try {
        //GET ALL
        const org = process.env.TENANT;
        const apiResponse = await xero.accountingApi.getJournals(process.env.TENANT);
        let c = 1;
        res.json(apiResponse.body);
        apiResponse.body.journals.forEach((journal) => {
            const Date = journal.journalDate;
            journal.journalLines.forEach((line) => {
                let s;
                if (line.grossAmount < 0) {
                    s = "debit";
                } else {
                    s = "credit";
                }
                const jbody = {
                    Provider: 'xero',
                    Org: org,
                    Account_name: line.accountName,
                    Account_id: line.accountID,
                    Amount: line.grossAmount,
                    Date: Date,
                    Type: s
                }
                Journal.find({ Account_id: jbody.Account_id }, (err, found) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (found.length < 1) {
                            const data = new Journal(jbody);
                            data.save(err => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    }
                })

                // console.log(`save ${c}`);
                // c = c + 1;
            })
        })
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
const getquickjournals = async () => {
    const companyID = oauthClient.getToken().realmId;
    const url =
        oauthClient.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production;
    oauthClient
        .makeApiCall({
            url: `${url}v3/company/${companyID}/query?query=select * from JournalEntry where 
      Metadata.CreateTime 
      > '2014-12-31'` })
        .then(function (authResponse) {
            const query = (JSON.parse(authResponse.text()));
            const journalentries = query.QueryResponse.JournalEntry;
            let c = 1;
            journalentries.forEach(function (entry) {
                const Date = entry.TxnDate;
                entry.Line.forEach(function (line) {
                    const Account_name = line.JournalEntryLineDetail.AccountRef.name;
                    const Account_id = line.JournalEntryLineDetail.AccountRef.value;
                    const Amount = line.Amount;
                    const Type = line.JournalEntryLineDetail.PostingType;
                    const jbody = {
                        Provider: 'quickbooks',
                        Org: companyID,
                        Account_name: Account_name,
                        Account_id: Account_id,
                        Amount: Amount,
                        Date: Date,
                        Type: Type
                    }
                    Journal.find({ Account_id: jbody.Account_id }, (err, found) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (found.length < 1) {
                                const data = new Journal(jbody);
                                data.save(err => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                            }
                        }
                    })
                })
            })
            return true;
        })
        .catch(function (e) {
            console.error(e);
            return false;
        });
}
cron.schedule('3 5 * * *', async () => {
    const val1 = await getxerojournals();
    const val2 = await getquickjournals();
    console.log(val1, val2);
});

app.get('/getJournals', async function (req, res) {
    // await getToken();
    // await refreshtoken();
    const companyID = oauthClient.getToken().realmId;
    const url =
        oauthClient.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production;
    oauthClient
        .makeApiCall({
            url: `${url}v3/company/${companyID}/query?query=select * from JournalEntry where 
      Metadata.CreateTime 
      > '2014-12-31'` })
        .then(function (authResponse) {
            const query = (JSON.parse(authResponse.text()));
            const journalentries = query.QueryResponse.JournalEntry;
            let c = 1;
            journalentries.forEach(function (entry) {
                const Date = entry.TxnDate;
                entry.Line.forEach(function (line) {
                    const Account_name = line.JournalEntryLineDetail.AccountRef.name;
                    const Account_id = line.JournalEntryLineDetail.AccountRef.value;
                    const Amount = line.Amount;
                    const Type = line.JournalEntryLineDetail.PostingType;
                    const jbody = {
                        Provider: 'quickbooks',
                        Org: companyID,
                        Account_name: Account_name,
                        Account_id: Account_id,
                        Amount: Amount,
                        Date: Date,
                        Type: Type
                    }
                    const qentry = new Journal(jbody);
                    qentry.save();
                    console.log(`saved ${c}`);
                    c = c + 1;
                })
            })
            res.send('successful');
        })
        .catch(function (e) {
            console.error(e);
        });
});
app.post('/xero/new', verifyToken, async (req, res, next) => {
    try {
        const account = { name: req.body.name, code: req.body.name + "c:" + 365, type: xeroNode.AccountType.EXPENSE, hasAttachments: true };
        const accountCreateResponse = await xero.accountingApi.createAccount(id, account);
        console.log(accountCreateResponse.body);
        res.send({ message: 'Account created' });
    } catch (error) {
        console.error(error);
        id = null;
        id2 = null;
        res.redirect('http://localhost:3000/homepage')
    }
})

app.post('/quickbooks/new', verifyToken, (req, res, next) => {
    // res.send({ message: 'Account Created' })
    // console.log(req.body);
    const body = {
        "Name": req.body.name,
        "AccountType": "Expense"
    }
    const companyID = oauthClient.getToken().realmId;
    const url =
        oauthClient.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production;
    oauthClient
        .makeApiCall({
            url: `${url}v3/company/${companyID}/account`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(function (authResponse) {
            console.log(authResponse.body);
            res.send({ message: 'Account created' });
        })
        .catch(function (e) {
            console.error(e);
            id = null;
            id2 = null;
            res.redirect('http://localhost:3000/homepage')
        });
})

app.delete('/xero/delete', verifyToken, (req, res, next) => {
    res.send({ message: "Account Deleted" });
    console.log(req.body);
})


app.delete('/quickbooks/delete', verifyToken, (req, res, next) => {
    res.send({ message: "Account Deleted" });
    console.log(req.body);
})

app.post('/xero/edit', verifyToken, (req, res, next) => {
    console.log(req.body);
    res.send({ name: "piyush", description: "check" });
})

app.post('/quickbooks/edit', verifyToken, (req, res, next) => {
    console.log(req.body);
    res.send({ name: "piyush", description: "check" });
})









app.listen(8080, () => {
    console.log("server at port 8080")
})