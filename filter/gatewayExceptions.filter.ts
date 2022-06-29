import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export type ErrorResponseType = {
  name: string;
  message: any;
};
export const ERROR = {
  DATABASE: 'DATABASE_ERROR',
  CAST: 'CAST_ERROR',
  VALIDATION: 'ValidationError',
  BAD_REQUEST: 'BAD_REQUEST',
  FORBIDDEN_REQUEST: 'FORBIDDEN_REQUEST',
  ERROR: 'Error',
};
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const error = exception as ErrorResponseType;
    const responseBody = {
      error: error.name,
      message: error.message,
    };

    switch (error.name) {
      case ERROR.BAD_REQUEST:
        httpStatus = HttpStatus.BAD_REQUEST;
        break;
      case ERROR.DATABASE:
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case ERROR.CAST:
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case ERROR.VALIDATION:
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      case ERROR.FORBIDDEN_REQUEST:
        httpStatus = HttpStatus.FORBIDDEN;
        break;

      default:
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
