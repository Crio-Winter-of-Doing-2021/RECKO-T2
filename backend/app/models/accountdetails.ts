import mongoose from 'mongoose';
import { TokenSet } from 'openid-client';
const detailschema = new mongoose.Schema({
    account_name: String,
    account_id: String,
    amount: Number,
    date: String,
    type: String
})

export const Detail = mongoose.model('Detail', detailschema);