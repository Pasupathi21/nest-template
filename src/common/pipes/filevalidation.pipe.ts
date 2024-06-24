import { PipeTransform, Injectable, ArgumentMetadata, Logger, BadRequestException } from '@nestjs/common'
// import { FileValidator, IFile } from 'nestjs-file-upload'
import { allMimeType } from 'src/data/app.const'

type files = Record<string, any> | Record<string, any>[] |any
Injectable()
export class UploadFileValidation implements PipeTransform {
    logger = new Logger(UploadFileValidation.name)
    isValid(files: files) {
        try{
            function argumentTest(file: files): Record<string, any>{
                if(!file?.mimetype) return { isValid: false, message: 'Mimetype missing'}
                if(!allMimeType.includes(file?.mimetype)) return { isValid: false, message: 'Invalid file, incorrect mimetype'}

                return { isValid: true }
            }
            if(Array.isArray(files)){
                let retrunOption = {} as Record<string, any>
                for(let i =0; i < files?.length; i++){
                    retrunOption = argumentTest(files[i])
                    if(!retrunOption?.isValid)break
                }
                return retrunOption
            }else {
                return argumentTest(files)
            }
        }catch(error){
            return {
                isValid: false,
                message: 'something went wrong, in file validation process',
                error: error
            }
        }
    }
    transform(value: any, metadata: ArgumentMetadata){
        // this.logger.log("value >>>>>>>>", value)
        const validationObj = this.isValid(value)
        console.log("validationObj", validationObj)
        if(!validationObj?.isValid){
            throw new BadRequestException(validationObj?.message)
        }
        return value
    }

}