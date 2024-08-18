import { Injectable, Res, HttpException } from '@nestjs/common';
import { Response, Request} from 'express'

type ResponseData = Record<string,any> | Record<string, unknown> | Array<any> | number | string | Buffer | Blob | null

@Injectable()
export class ResponseService {
    constructor(){}

    // ************** For json response handling
    /**
     * 
     * @param response 
     * @param data 
     * @param statusCode 
     * @param message 
     * @returns 
     * failed response
     */
    failed(@Res() response: Response, data: ResponseData = {}, message: string = '', statusCode: number = 500,): Response {
        console.log("response >>>>>>>>>>>", response.status)
        return response.status(statusCode).json({
            message: message || 'Internal server error, please try again later',
            data,
            status: false
        })
    }

    /**
     * 
     * @param response 
     * @param data 
     * @param statusCode 
     * @param message 
     * @returns 
     * success
     */
    success(@Res() response: Response, data: ResponseData = {} , statusCode: number = 200, message?: string): Response {
        try{
            return response.status(statusCode).json({
                message: message || 'success',
                data,
                status: true
            })
        }catch(error){
            return this.failed(response, null, error?.message)
        }
    }

    // *************** direct resposne handling
    /**
     * 
     * @param response 
     * @param data 
     * @param statusCode 
     * @returns 
     */
    send(@Res() response: Response, data: ResponseData = {}, statusCode: number = 200){
        try{
            return response.status(statusCode).send(data)
        }catch(error){
            return this.failed(response, data)
        }
    }

    
}
