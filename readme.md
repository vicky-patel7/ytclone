## Download both the folder, client and server on your local system
## In each folder i.e. client and server install all the required npm packages using the `npm install` command
## Also add .env file in each folder int the root directory of the client and server
## In the server .env add the required two values `DATABASE_URI` and `JWT`
## `DATABASE_URI` will be your mongodb database collection url and `JWT` will be the any random string of any size(keep length more than 10)
## In the client .env add the required `REACT_APP_FIREBASE_API` and `REACT_APP_URL` which are your firebase api key and base url of the backend server respectively. Base url of the backed server will be `http://localhost:8000/api` when the server is running on the localhost.