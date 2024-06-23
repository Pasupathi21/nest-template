import {join } from 'path'
export const viewsFolderPath = join(__dirname, '..', 'views')

export const tempDirPath = join(__dirname, '..', '..', 'temp')

export const MAX_FILES_UPLOAD_COUNT = 5

export const videoMimeTypes = [
    "video/x-msvideo",
    "video/mpeg",
    "video/ogg",
    "video/mp2t",
    "video/webm",
    "video/3gpp",
    "video/3gpp2",
    "video/mp4",
    "video/x-matroska",
    "video/quicktime"
];

export const audioMimeTypes = [
    "audio/aac",
    "audio/midi",
    "audio/x-midi",
    "audio/mpeg",
    "audio/ogg",
    "audio/wav",
    "audio/webm",
    "audio/3gpp",
    "audio/3gpp2",
    "audio/mp4"
];
 export const imageMimeTypes = [
    "image/bmp",
    "image/gif",
    "image/vnd.microsoft.icon",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp"
];

export const documentMimeTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/rtf",
    "text/csv",
    "text/plain",
    "application/json",
    "application/epub+zip",
    "application/zip",
    "application/x-7z-compressed",
    "application/x-tar",
    "application/x-rar-compressed",
    "application/x-bzip",
    "application/x-bzip2",
    "application/vnd.oasis.opendocument.text",
    "application/vnd.oasis.opendocument.spreadsheet",
    "application/vnd.oasis.opendocument.presentation"
];

export const allMimeType = [
    ...imageMimeTypes,
    ...audioMimeTypes,
    ...videoMimeTypes,
    ...documentMimeTypes
]