const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EMS', err =>{
    if(!err){
        console.log('DB Connection Successfull');
    }
    else{
        console.log('Error in DB connection'+err);
    }
})

module.exports = mongoose;