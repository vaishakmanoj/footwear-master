const mongoose = require('mongoose')
function dbConnect(cb){


try{
    mongoose.connect('mongodb://127.0.0.1:27017/usersdb');
    const db = mongoose.connection;
    console.log('connected');
    cb(true)
}
catch(e){
    console.log(e);
    cb(false)
}
}
module.exports ={ dbConnect:dbConnect }
// db.on('error',error => console.log(error))
// db.once('open',()=>console.log('connected mongoose'))
