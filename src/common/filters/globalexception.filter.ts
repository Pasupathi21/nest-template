import { HttpException, ExceptionFilter,Catch, ArgumentsHost, Logger } from '@nestjs/common'
import { Response } from 'express'
import { ResponseService } from '../../services/response/response.service';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name)
    constructor(private readonly responseService: ResponseService){}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        const excpResponse = exception.getResponse()
        this.logger.log(excpResponse)
        this.responseService.failed(response, null, exception.message, status)
        // response.status(status).send({
        //     message: exception.message,
        //     status: false,.
        //     data: null
        // })
    }
}