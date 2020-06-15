import { Injectable, NestInterceptor, ExecutionContext, CallHandler,BadGatewayException } from '@nestjs/common';
import { Observable, throwError  } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { MsgResult } from './common.dto';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    console.log('data')
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    return next.handle().pipe(catchError(err => {
        console.log('err',err.response)
        response
      .status(1001)
      .json({
        statusCode: 100000,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
        // return err.response
        return throwError(err.response)
        // return throwError(new MsgResult(false,`${err}`,err.response))
    }));
    
  }
}