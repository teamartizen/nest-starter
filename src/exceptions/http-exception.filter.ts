import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { statusCode: 500, message: 'Internal Server Error' };

    const ip =
      request.headers['x-forwarded-for'] ||
      request.socket.remoteAddress ||
      request.ip;

    if (['/api/auth/me', '/api/user/me'].includes(request.url)) {
      console.error('\n\nNsjstarterException\n============\n\nAuth.me Error:', {
        ip,
        timestamp: new Date().toString(),
      });
    } else {
      console.error('\n\nNsjstarterException\n================\n\n', {
        exception,
        ip,
        timestamp: new Date().toString(),
      });
    }

    const rs =
      typeof errorResponse === 'string'
        ? { error: errorResponse }
        : errorResponse;

    response.status(status).json({
      ...rs,
      timestamp: new Date().toISOString(),
      path: request.url,
      exception,
    });
  }
}
