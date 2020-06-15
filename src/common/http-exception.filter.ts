import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const resData = exception.getResponse();
    console.log('resData', resData);
    if (typeof resData == 'object') {
      if (typeof resData['message'] == 'object') {
        response.status(200).json({
          status: false,
          msg: resData['message'].join(','),
          data: null,
        });
      }
    }
  }
}
