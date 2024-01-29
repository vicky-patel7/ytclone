const mongoose = require('mongoose');

mongoose.connect(`${process.env.DATABASE_URI}`, {
    
}).then(() => {
    console.log('Connected to DB');
}).catch(err => console.log(err))
