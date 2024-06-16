import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PugService } from 'src/utils/helpers/pug/pug.service';
import { viewsFolderPath, tempDirPath } from 'src/data/app.const'
import { join } from 'path'
import * as fs from 'fs'
import archiver from 'archiver'
// import * as pdf from 'html-pdf'
// import puppeteer from 'puppeteer';
import pdf from 'html-pdf-node'

@Injectable()
export class TemplateService {
  constructor(
    private readonly pugService: PugService
  ){}
  create(createTemplateDto: CreateTemplateDto) {
    return 'This action adds a new template';
  }

  findAll() {
    return `This action returns all template`;
  }

  findOne(id: number) {
    return `This action returns a #${id} template`;
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template`;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
  }
  async htmlFile(): Promise<any> {
    try{
      const data = {
        title: "User List",
        users: [
          { name: "Alice", age: 30, active: true },
          { name: "Bob", age: 24, active: false },
          { name: "Charlie", age: 29, active: true }
        ]
      }
      const pdfDir = join(tempDirPath, 'pdfs')
      if(!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true})

      async function convertHtmlToPdf(html: string, filename: string) {
        return new Promise(async (resolve, reject) => {
          // pdf.create(html).toFile(`${pdfDir}/${filename}`, (err, res) => {
          //   if(err)reject(err)
          //   resolve(res?.filename)
          // })
          const pdfPath = `${pdfDir}/${filename}`
          // const browser = await puppeteer.launch()
          // const page = await browser.newPage()
          // await page.setContent(html)
          // await page.pdf({ path: pdfPath, format: 'A4'})
          // await browser.close()
          const file = { content: html };
          const options = { path: pdfPath, format: 'A4' };
          await pdf.generatePdf(file, options);
          return pdfPath
        })
      }

      // get two files [html to pdf]
      const getPdfs = async () => {
        const pdfArray = []
        for(let i =0; i < 2; i++){
          const html = await this.pugService.parsePugToHtml(join(viewsFolderPath, 'test-template.pug'), {...data, pdfCount: i +1})
          pdfArray.push(await convertHtmlToPdf(html, `pdf-${i+1}-${Date.now()}.pdf`))
        }
        return pdfArray
      }

      async function createZipFile() {
        return new Promise(async (resolve, reject) => {
          try{
              const pdfs = await getPdfs()
              const output = fs.createWriteStream('output.zip')
              const archive = archiver('zip', { zlib: { level: 9 }})
              const chunks = [];
        
              archive.on('data', chunk => chunks.push(chunk));
              archive.on('end', () => resolve(Buffer.concat(chunks)));
              archive.on('error', reject);
              // output.on('error', (err) => {
              //   reject(err)
              // })
              // archive.pipe(output)
              // pdfs.forEach(f => archive.append(fs.createReadStream(f), { name: f}))
              pdfs.forEach((f: string) => archive.file(f, { name: f.split('/').pop()}))
              archive.finalize()
          }catch(err){
            reject(err)
          }
        })
      }
      const buf = await createZipFile()

      // console.log("html >>>>>", html)
      return Promise.resolve(buf)
    }catch(error){
      console.log("error", error)
      return Promise.reject(error)
    }
  }
}
