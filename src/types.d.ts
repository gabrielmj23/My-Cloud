// Express request for uploads
interface UploadRequest extends Express.Request {
  body: {
    uploadPath: string
  },
  file: Express.Multer.File
}

// Express request for downloads
interface DownloadRequest extends Express.Request {
  body: {
    downloadPath: string
  }
}

// Type returned from getting list of files in a directory
type FileInfo = {
  filename: string,
  extension: string,
  size: number
}
