const express = require('express');


const router = express.Router();

const adminController = require("../controllers/admincontroller");
const { logOut } = require('../controllers/userController');
const userController = require('../controllers/userController');


router.get('/',adminController.admin)
router.get('/dashboard',adminController.home)
router.post('/login',adminController.adminlogin)
router.get('/logout',adminController.logOut)

router.post('/blockUser/:id',adminController.blockUser)
router.post('/unblockUser/:id',adminController.blockUser)


 

















module.exports = router;