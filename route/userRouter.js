let express=require("express");
let session=require("express-session")
let router=express();
const userController=require("../controller/usercontroller")
const { v4: uuidv4 } = require('uuid')
const cache=require('nocache')

router.set('view engine','ejs');
router.set('views','views/user');

//session
router.use(cache())
router.use(session({

    secret: uuidv4(),
    resave: 'false',
    saveUninitialized:true
}))

router.get('/signup',userController.signup)
router.get('/',userController.login)
router.get('/home',userController.home)
router.post('/signupSubmit',userController.dashboard)
router.get('/trial',userController.trial)
router.get('/usersignout',userController.usersignout)
router.post('/loginSubmit',userController.logincheck)

module.exports=router;
