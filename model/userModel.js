const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

firstName :{
    type:String,
     required:true
    
},

lastName:{
    type:String,
    required:true

},

email :{
    type:String,
    required:true
},

pass:{
    type:String,
    required:true
},

status:{
    type:String,
    default:'unblocked'
}






})

module.exports=Userdata=mongoose.model('Userdata',userSchema)