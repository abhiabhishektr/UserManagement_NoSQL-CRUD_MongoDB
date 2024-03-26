const express=require('express')
const app=express()
const port=3003
const user=require('./route/userRouter')
const admin=require('./route/adminRouter')
const cache=require('nocache')
const mongoose=require('mongoose')
const session=require('express-session')
const { adminLogin } = require('./controller/adminController')
    app.use(express.json())
    app.use(express.urlencoded({extended : true}))

app.use('/',user)
app.use('/',admin)
app.use(cache())


// ------------------

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))




// ------------------
mongoose.connect('mongodb://127.0.0.1:27017/login').then(()=>{
    console.log("Mongodb connected");
}).catch(()=>{
    console.log("Failed to connect");
})





app.listen(port, () => {
    console.log(`server is running ${port}`);
});
