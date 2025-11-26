import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const switchToHttp = host.switchToHttp();

    const request = switchToHttp.getRequest<Request>();
    const response = switchToHttp.getResponse<Response>();

    const isHttpException = exception instanceof HttpException;

    const message = isHttpException
      ? exception.message
      : 'Internal server error';
    const statusCode = isHttpException ? exception.getStatus() : 500;

    response.status(statusCode);

    response.json({
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
