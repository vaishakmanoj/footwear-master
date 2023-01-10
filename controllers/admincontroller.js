const User = require("../model/userModel")
const bcrypt = require('bcrypt')

const loadlogin = (req,res) =>{
    try{
        
        res.render('admin/adminlogin')
    }

    catch(error)  {

            console.log(error.message);
    }
}

module.exports = {
    //admin home page
    home: (req, res) => {
        if (req.session.adminLogin) {
            res.render('admin/admindashboard')
        }else{
            res.redirect('/admin')
        }
    },

    //login page
    admin: (req, res) => {
        if (!req.session.adminLogin) {
            res.render('admin/adminlogin')
        } else {
            res.redirect('/admin/dashboard')
        }
    },



    //-------------------------------------------------------------------------------------------------

    //login
    adminlogin:  async(req, res) => {
        let admin={
            email:'admin@gmail.com',
            password:'123'
        }
        let adminEmail=req.body.email
        let adminPass=req.body.password
        if(adminEmail==admin.email&&adminPass==admin.password){
 const users = await User.find({})

            req.session.adminLogin=true
            res.render('admin/admindashboard',{users})

        }else{
            console.log('err');
            res.redirect('/admin')
        }
       
    },
    logOut:(req,res)=>{
        req.session.destroy()
        res.redirect('/admin')
    },
    blockUser:async(req,res)=>{
      const userId =  req.params.id;
      console.log(userId);
      
      await User.updateOne ({id:userId},{$set:{status:"block"}})
      res.redirect('/admin/admindashboard')
      
    },
    unblockUser:async(req,res)=>{
        const userId =  req.params.id;
        console.log(userId);
        
        await User.updateOne ({id:userId},{$set:{status:"unblocked"}})
        res.redirect('/admin/admindashboard')
        
      }
  


}