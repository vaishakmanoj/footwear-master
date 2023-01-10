const { Router } = require('express');
const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')




router.get('/login', userController.loginView)
router.get('/',userController.homeview)

router.get('/userSignup',userController.userSignup)
router.get('/logout',userController.logOut)
router.post('/details',userController.userdetails)
router.post('/login',userController.login)














module.exports = router;