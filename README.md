# ☁ My-Cloud
## Set up your own cloud server at home
Cloud server + frontend built with Typescript, Express and React. Can handle file uploads and downloads of any tipe, plus the creation of new directories.

## Set up
### Server
1. Run `npm install` in the server directory.
2. If you wish, create a `.env` file and add a `PORT` variable to customize the server's port. By default this will be 3000.
3. Run `npm run dev`. The server will be ready, and you'll find uploaded files in the `/storage` folder.

### Client
1. Run `npm install` in the client directory.
2. Change the `.env` file to set the `VITE_SERVER_URL` variable to whatever url the server is running on. The default works for hosting locally on port 3000.
3. Run `npm run dev` and go to the url provided in the command line from vite.

## To do
- Delete and move files functionalities.