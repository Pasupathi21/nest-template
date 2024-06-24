import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app'
import { FirebaseStorage, getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { imageMimeTypes, audioMimeTypes, videoMimeTypes, documentMimeTypes} from 'src/data/app.const'

type fileType = string | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOC'

@Injectable()
export class FirebaseService {

    logger = new Logger(FirebaseService.name)
    private firebaseApp: FirebaseApp = initializeApp({
        apiKey: process?.env?.API_KEY,
        authDomain: process?.env?.AUTH_DOMAIN,
        projectId: process?.env?.PROJECT_ID,
        storageBucket: process?.env?.STORAGE_BUCKET,
        messagingSenderId: process?.env?.MESSAGING_SENDER_ID,
        appId: process?.env?.APP_ID,
        measurementId: process?.env?.MEASUREMENT_ID
    });
    storageInstance: FirebaseStorage = getStorage(this.firebaseApp)
    
    getFolderHierarchyPath(file) {
        return imageMimeTypes.includes(file.mimetype) ? 'images' :
            audioMimeTypes.includes(file.mimetype) ? 'audios' :
                videoMimeTypes.includes(file.mimetype) ? 'videos' :
                    documentMimeTypes.includes(file.mimetype) ? 'docs' :
                        'others'
    }
    private async upload_to_firebase(file: Record<string, any>, fileType: fileType) {
        try {
            console.log("firebaseApp >>>>>>>", {
                apiKey: process?.env?.API_KEY,
                authDomain: process?.env?.AUTH_DOMAIN,
                projectId: process?.env?.PROJECT_ID,
                storageBucket: process?.env?.STORAGE_BUCKET,
                messagingSenderId: process?.env?.MESSAGING_SENDER_ID,
                appId: process?.env?.APP_ID,
                measurementId: process?.env?.MEASUREMENT_ID
            })
            let folderHierarchy = 'UPLOADES/'
            // folderHierarchy += fileType === 'IMAGE' ? 'images' :
            //     fileType === 'AUDIO' ? 'audios' :
            //         fileType === 'VIDEO' ? 'videos' :
            //             fileType === 'DOC' ? 'docs' :
            //                 'others'
            const fullPath = `${folderHierarchy}${this.getFolderHierarchyPath(file)}/${Date.now()}-${file?.originalname}`
            this.logger.log(fullPath)
            const storageRef = ref(this.storageInstance, fullPath)
            // console.log(storageRef)
            const uploadTask = uploadBytesResumable(
                storageRef,
                file?.buffer,
                {
                    contentType: file.mimetype
                })
            uploadTask.on('state_changed', (snap) => {
                this.logger.log(`progress completed: ${(snap.bytesTransferred / snap.totalBytes) * 100}%`)
            },
                (error) => {
                    console.log("error", error)
                    new HttpException(error?.message, HttpStatus.INTERNAL_SERVER_ERROR)
                },
                async () => {
                    try{
                        return Promise.resolve({
                            ...uploadTask.snapshot.metadata,
                            downloadUrl: await getDownloadURL(uploadTask.snapshot.ref)
                        })
                    }catch(err){
                        this.logger.log("catch error", err)
                        new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR)
                    }
                }
            )
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async upload_one_or_many(files: Record<string, any> | Record<string, any>[], fileType?: fileType) {
        const fileuploadResponse = []
        try {
            if (!Array.isArray(files)) {
                const res = await this.upload_to_firebase(files, fileType)
                fileuploadResponse.push(res)
            } else {
                for (let index = 0; index < files?.length; index++) {
                    const res = await this.upload_to_firebase(files[index], fileType)
                    fileuploadResponse.push(res)
                }
            }
            return Promise.resolve({
                status: true,
                message: 'upload success',
                fileuploadResponse
            })
        } catch (error) {
            console.log("error >>>", error)
            return Promise.reject({
                status: false,
                message: 'upload failed to firebase',
                error: error
            })
        }

    }

}
