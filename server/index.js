require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
require('./config/dbConnect');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8000;
// app.use(cors({
//     origin : 'https://videotube-bc1h.onrender.com',
//     credentials : true
// }));
app.use(express.json());
app.use(cookieParser());

// const keys = [
//     'ahshuabhdbandahsdgajsd',
//     'fasuytgjarbhahsgdhtasd',
// ];
app.use(cors());
// app.use(cookieSession({
//     name: 'session',
//     keys: keys,
//     sameSite: 'None',
//     secure: process.env.NODE_ENV === 'production' ? true : false,
// }));


app.get('/', (req, res) => {
    res.send("Welcome to the server ! This is the base URL.");
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/youtube', require('./routes/youtube'));


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({ success : false, status, message });
})


app.listen(PORT, () => {
    console.log('listening on port', PORT);
})