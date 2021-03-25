import mongoose from 'mongoose';
import { TokenSet } from 'openid-client';
const tokenschema = new mongoose.Schema({
    id_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    refresh_token: String,
    scope: String,
    session_state: String
})
export const tokenModel = mongoose.model('tokenModel', tokenschema);


