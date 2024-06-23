import { Injectable, Logger } from '@nestjs/common';
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
    private folderHierarchy = 'UPLOADES/'
    
    getFolderHierarchyPath(file) {
        return imageMimeTypes.includes(file.mimetype) ? 'images' :
            audioMimeTypes.includes(file.mimetype) ? 'audios' :
                videoMimeTypes.includes(file.mimetype) ? 'videos' :
                    documentMimeTypes.includes(file.mimetype) ? 'docs' :
                        'others'
    }
    private async upload_to_firebase(file: Record<string, any>, fileType: fileType) {
        try {
            this.folderHierarchy += fileType === 'IMAGE' ? 'images' :
                fileType === 'AUDIO' ? 'audios' :
                    fileType === 'VIDEO' ? 'videos' :
                        fileType === 'DOC' ? 'docs' :
                            'others'
            const fullPath = `${this.folderHierarchy}${this.getFolderHierarchyPath(file)}`
            const storageRef = ref(this.storageInstance, fullPath)
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
                    this.logger.log("error", error.message)
                    return Promise.reject(error)
                },
                async () => {
                    return Promise.resolve({
                        ...uploadTask.snapshot.metadata,
                        downloadUrl: await getDownloadURL(uploadTask.snapshot.ref)
                    })
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
                fileuploadResponse.push(await this.upload_to_firebase(files, fileType))
            } else {
                for (let index = 0; index < files?.length; index++) {
                    fileuploadResponse.push(await this.upload_to_firebase(files[index], fileType))
                }
            }
            return Promise.resolve({
                status: true,
                message: 'upload success',
                fileuploadResponse
            })
        } catch (error) {
            return Promise.reject({
                status: false,
                message: 'upload failed to firebase',
                error: error
            })
        }

    }

}
