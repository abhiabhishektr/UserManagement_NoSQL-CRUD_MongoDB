let express =require("express");
let router=express();
let session=require("express-session")
const adminController=require('../controller/adminController')
const { v4: uuidv4 } = require('uuid')
const cache=require('nocache')



router.set('view engine','ejs');
router.set('views','views/admin');
router.use(cache())
router.use(session({

    secret: uuidv4(),
    resave: 'false',
    saveUninitialized: true

}))


router.get('/admin',adminController.adminLogin);
router.get('/adminhome',adminController.adminhome);
// to  login the admin and to check the admin
router.post('/adminsubmit',adminController.admincheck);
router.get('/adduser',adminController.adduser)
router.post('/useradded',adminController.useradded)


router.get('/edituser/:id',adminController.edituser)
router.post('/useredited/:id',adminController.useredited)
router.post('/userdelete/:id',adminController.deleteuser)
router.get('/adminsignout',adminController.adminsignout)


module.exports = router