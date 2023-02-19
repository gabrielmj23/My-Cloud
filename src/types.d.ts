// Express request for uploads
interface UploadRequest extends Express.Request {
  file: Express.Multer.File
}

// Type returned from getting list of files in a directory
type FileInfo = {
  filename: string,
  extension: string,
  size: number
}
