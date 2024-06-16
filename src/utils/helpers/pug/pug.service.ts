import { Injectable } from '@nestjs/common';
import { compileFile } from 'pug'

@Injectable()
export class PugService {
    constructor(){}

async parsePugToHtml(templatePath: string, templateData: any = {}): Promise<any>{
    try{
        console.log("templatePath", templatePath)
        const compileFn = compileFile(templatePath)
        return Promise.resolve(compileFn(templateData))
    }catch(error){
        console.log("error >>>>>>", error)
        return Promise.reject(error)
    }
}
}
