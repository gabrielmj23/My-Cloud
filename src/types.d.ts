// Express request that includes a file (required, unlike actual Express request type)
interface RequestWithFile extends Express.Request {
  file: Express.Multer.File
}