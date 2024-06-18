import { HttpException, ExceptionFilter,Catch, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        response.status(status).send({
            message: exception.message,
            status: false,
            data: null
        })
    }
}