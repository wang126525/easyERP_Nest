import { Controller, Get, Post, Body, Query, UseInterceptors, } from '@nestjs/common';
import { LoginService } from './goods.service';
import { MsgResult } from '../common/common.dto';
import { LoginParams, RegisterParams,  } from './goods.interface';
import LoginInterceptor from '../common/login.interceptor';
import { query } from 'express';

@Controller("/api/admin")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post("queryName")
  queryName(@Body("username") username:string): Promise<MsgResult> {
    console.log(username)
    return this.loginService.queryName(username);
  }

  @Post("register")
  register(@Body() params:RegisterParams):Promise<MsgResult>{
    return this.loginService.register(params);

  }

  @Post("login")
  login(@Body() params:LoginParams): Promise<MsgResult> {
    return this.loginService.login(params);
  }

}


@UseInterceptors(LoginInterceptor)
@Controller("/api/common")
export class GetUserInfoController {
  constructor(private readonly loginService: LoginService) {}

  @Get("getuser")
  getUserInfo(@Query() query:LoginParams): Promise<MsgResult> {
    return this.loginService.getInfo(query);
  }
  
}
