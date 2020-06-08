import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import CommonUtils from '../common/common.util';
import {
  UserEntity,
  UserLogin,
  LoginParams,
  RegisterParams,
} from './goods.interface';
import { MsgResult } from '../common/common.dto';
// import { promises } from 'dns';
import * as jwt from 'jsonwebtoken';
import { type } from 'os';
import { types } from 'util';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserEntity>,
    @InjectModel('Login') private readonly loginModel: Model<UserLogin>,
  ) {}
  async login(params: LoginParams): Promise<MsgResult> {
    const loginUser: UserLogin = await this.loginModel
      .findOne({ username: params.username, password: params.password })
      .exec();
    if (loginUser) {
      console.log(params, loginUser);
      // const userInfo: UserEntity = await this.userModel
      //   .findOne({ name: params.username })
      //   .exec();
      const info = {
        username: loginUser.username,
        userole: loginUser.userole,
        addtime: loginUser.addtime,
        edittime: loginUser.edittime
      };
      const token = jwt.sign(info, '123456789' /*秘钥*/, {
        expiresIn: '7d' /*过期时间*/,
      });
      return Promise.resolve(new MsgResult(true, 'success', { userInfo:info, token }));
    } else {
      return Promise.resolve(new MsgResult(false, '用户名或密码错误'));
    }
  }
  async getInfo(query: LoginParams): Promise<MsgResult> {
    if (query.username) {
      const userInfo: UserEntity = await this.userModel
        .findOne({ name: query.username })
        .exec();
      console.log('userInfo2', userInfo);
      return Promise.resolve(new MsgResult(true, 'success', userInfo));
    } else {
      return Promise.resolve(new MsgResult(false, '参数错误！'));
    }
  }
  async register(params: RegisterParams): Promise<MsgResult> {
    console.log(params);
    const userIsExist: UserLogin = await this.loginModel
      .findOne({ username: params.username })
      .exec();
    if (!userIsExist) {
      if (params.password != '' && params.username != '' && params.userole != ''&& params.addtime!=''&&params.edittime!='') {
        const id = new Types.ObjectId();
        try {
          const result: UserLogin = await this.loginModel.create({
            _id: id,
            username: params.username,
            password: params.password,
            userole: params.userole,
            addtime:params.addtime,
            edittime:params.edittime
          });
          console.log('result', result);
          return Promise.resolve(new MsgResult(true, 'success', result));
        } catch (error) {
          return Promise.resolve(new MsgResult(false, `${error}`));
        }
      } else {
        return Promise.resolve(new MsgResult(false, '参数错误'));
      }
    } else {
      return Promise.resolve(new MsgResult(false, '用户已存在'));
    }
  }
  async queryName(username:string):Promise<MsgResult>{
    console.log('username',username)
    if(username!=''){
      const isExistUser: UserLogin = await this.loginModel.findOne({username}).exec()
      if(isExistUser){
        return Promise.resolve(new MsgResult(true,"success",{isExist:true}))
      }else{
        return Promise.resolve(new MsgResult(true,"success",{isExist:false}))
      }
    }else{
      return Promise.resolve(new MsgResult(false,"参数错误"))
    }



    
  }
}
