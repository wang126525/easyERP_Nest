import { Document, Types } from 'mongoose';

export interface UserEntity extends Document {
  _id: Types.ObjectId
  name: string
  age: number
  dsc: string

}

export interface UserLogin extends Document {
  _id: Types.ObjectId
  username: string
  password: string
  userole:string
  addtime:string
  edittime:string

}

export interface LoginParams {
  username:string
  password:string
  userole:string
}

export interface RegisterParams{
  username:string
  password:string
  userole:string
  addtime:string
  edittime:string
}


