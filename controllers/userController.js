const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")

module.exports={

loginView: (req,res)=>{
  console.log(req.session.userLogin);
  if(req.session.userLogin){
    res.redirect('/')
  }else{
    res.render('user/login')
  }
   

    
},
 
userSignup : (req,res) =>{

  
    res.render('user/signup')
},

userdetails : (req,res) =>{

    const {firstName,lastName,email,pass} = req.body;
 bcrypt
  .genSalt(10)
  .then(salt => {
    console.log('Salt: ', salt)
    return bcrypt.hash(pass, salt)
  })
  .then(hash => {
    console.log('Hash: ', hash)

    const userData = userModal(
        {
            firstName:firstName,
            lastName:lastName,
            email:email,
            pass:hash
        }

    ) 
    userData.save();
  })
  .catch(err => console.error(err.message))
 
    res.redirect('/login')
    

   
},

//signin
 login: async (req, res) => {
  console.log(req.body);
  // const { email, password } = req.body;
  const userEmail = req.body.email
  const password = req.body.password
 
  const user = await userModel.findOne({email:userEmail});    //does user exist ?
  if (!user) {
    console.log('user not exist');
     res.redirect('/userSignup');
    
  }else{

   console.log(user.pass); 
  const isMatch = await bcrypt.compare(password, user.pass);   //does password match
  if (!isMatch) {
    console.log('pass err');

     res.redirect('/login');
  }else{
    req.session.user = user.userName
    req.session.userId = user._id
    req.session.userLogin = true;
    console.log(req.session.userLogin);
    res.redirect('/');
  }

  }

},
homeview:(req,res)=>{
  let user=req.session.userLogin
  res.render("user/index",{user})
},
logOut:(req,res)=>{
  req.session.destroy()
  res.redirect('/')
}
}