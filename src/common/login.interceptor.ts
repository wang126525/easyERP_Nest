import { Model, Types } from 'mongoose'
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
// import { Observable } from 'rxjs'
import { InjectModel } from '@nestjs/mongoose'
import { ServerResponse } from 'http'
import { Request } from 'express'
import { MsgResult } from './common.dto';

import * as jwt from 'jsonwebtoken'

@Injectable()
export default class LoginInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const http: HttpArgumentsHost = context.switchToHttp()
    const request: Request = http.getRequest()
    // console.log("request",request)
    const token = request.header('token')
    if (!token) {
      this.responseHandler(http.getResponse(), 403, '请先登录')
      return
    }
    try {
      const userInfo = jwt.verify(token, "123456789")
      // console.log("userInfo",userInfo)
      return next.handle()
    } catch (err) {
      let msg = null
      if (err instanceof jwt.TokenExpiredError) {
        msg = '登录超时'
      } else if (err instanceof jwt.JsonWebTokenError) {
        msg = 'Token无效'
      }
      this.responseHandler(context.switchToHttp().getResponse(), 403, msg)
    }
  }

  private responseHandler(response: ServerResponse, statusCode: number, msg: string): void {
    try {
      response.statusCode = statusCode
      response.setHeader('Content-Type', 'application/json')
      response.end(new MsgResult(false,msg))
    } catch (err) {}
  }
}
