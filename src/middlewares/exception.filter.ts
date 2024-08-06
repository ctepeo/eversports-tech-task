import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import {HttpArgumentsHost} from "@nestjs/common/interfaces";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        const {httpAdapter} = this.httpAdapterHost;
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody: {
            error: string;
            message?: string;
        } = {
            error: "Internal Server Error",
        };

        if (exception instanceof Error) {
            responseBody['message'] = exception.message;
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
