const express = require("express")
const path = require("path")
const logger = require("morgan")
const cookieParser = require('cookie-parser')
const session = require("express-session")
const {dbConnect} = require('./configeration/connection')


app = express()

const loginRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use((req, res, next) => {
      res.set("Cache-Control", "private,no-cache,no-store,must-revalidate");
      next();
  })
app.use(express.static(path.join(__dirname,'public')))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended:false}))
app.use(cookieParser())
app.use(session({ secret: "new" , cookie : { maxAge : 50000000}}))
dbConnect((res)=>{
      if(res){
            console.log('mongoose running bitches');
      }else{
            console.log('error');
      }
})


// app.use('/',loginRouter);
app.use('/',loginRouter)
app.use('/admin',adminRouter)



app.listen(3000,() =>{
      console.log('server start')
})

























