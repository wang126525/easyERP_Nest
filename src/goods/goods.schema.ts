import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    _id: Types.ObjectId,
    name: String,
    age: Number,
    dsc: String,
  },
  { collection: 'usertext', versionKey: false },
);

export const LoginSchema = new mongoose.Schema(
  {
    _id: Types.ObjectId,
    username: String,
    password: String,
    userole: String,
    addtime: String,
    edittime:String
  },
  { collection: 'user', versionKey: false },
);
