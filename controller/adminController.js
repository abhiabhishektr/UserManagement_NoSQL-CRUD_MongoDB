const session = require('express-session');
const user =require('../model/usermodel')  // requiring the mongodb model
const bcrypt = require('bcrypt');



// Hash the password here no need of comparing the pass
const crypting = (password)=>{
    return bcrypt.hash(password, 10) 
    }
    

    

    

const adminLogin= async(req,res)=>{

    if (req.session.admin) {
        try {
            const users = await user.find();  //users name is given by the programmer 
            res.render('adminDashboard', { users });
          } catch (error) {
            res.status(500).send(error.message);
          }
    } else {
        res.render('adminLogin') // here just rendering the page 
    }
    
}



const admincheck= async(req,res)=>{  // post method comes from here

    let adminData = await user.findOne({
        email: req.body.email,
        password: req.body.password,
        is_admin: 1 // here we can check the admin
      });
      
if (adminData) {
    //sending data from database to the login page
    req.session.admin=req.body.email 
    // console.log(req.session.admin);
    try {
            //   const users = await user.find();  //users name is given by the programmer 
              res.redirect('/admin')
            } catch (error) {
              res.status(500).send(error.message);
            }
// res.render('adminDashboard')
} else {
    res.render('adminlogin',{errorMessage:'invalid admin'})
}
        }



const  adduser=(req,res)=>{
    if (req.session.admin) {
            res.render('adduser') // here just rendering the page 

    } else {
        res.redirect('/admin')
    }
}


//updating
const edituser=async (req,res)=>{
    try {

        var idg=req.params.id
        const data =await user.findOne({_id:idg})
        const emaildata=data.email
        const namedata=data.name
        // console.log(emaildata);
        // console.log(namedata);
        

res.render('edituser',{idnew:idg,email:emaildata,name:namedata})  //,name:name,email:email

        
    } catch (error) {
        console.error(error);
    }
}

// updating post method
// const useredited = async (req, res) => {

//     const idnew =req.params.id 
    
//     let emailcheck=await user.findOne({email:req.body.email})
//     let emailsame=await user.findOne({_id : idnew})
// const mail= emailsame.email
// // && !mail
//     if (emailcheck && !mail ) {
//       res.render('edituser',{ message: 'Same user Exist',idnew: idnew });
     
//     }
//     else{

//     try {
//         // const idnew =req.params.id 

//         await user.updateOne(
//             { _id:idnew}, // Assuming 'id' is a string representing the ObjectId
//             { $set: { name: req.body.name, email: req.body.email } }
//         );



 
//     const users=await user.find()
//         // res.status(200).json({ success: true, message: 'User updated successfully' });
//         res.render('admindashboard',{users})
//     } catch (error) {
//         console.error(error); 
//         // res.status(500).json({ error: 'Internal Server Error' });
//     }
// }; 

// }


const useredited = async (req, res) => {
    const idnew = req.params.id;

    try {
        const emailCheck = await user.findOne({ email: req.body.email });

        // Check if the new email already exists and is not the same as the original email
        if (emailCheck && emailCheck._id.toString() !== idnew) {
            return res.render('edituser', { message: 'Same email exists for another user', idnew: idnew });
        }

        // Update the user information
        await user.updateOne(
            { _id: idnew },
            { $set: { name: req.body.name, email: req.body.email } }
        );

        const users = await user.find();
        res.render('admindashboard', { users });
    } catch (error) {
        console.error(error);
        // Handle the error appropriately, e.g., res.status(500).json({ error: 'Internal Server Error' });
    }
};




// deleting
// const deleteuser=async (req,res)=>{
//     try {

//         const id=  req.params.id
//         await user.deleteOne({_id:id});
//         // res.send('Item deleted successfully');
//         const users =await user.find()
//         res.render('adminDashboard',{ users }) //changing the user 
//     } catch (error) {
//         console.error(error);
//     }
    
// }


const deleteuser = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedUser = await user.findOneAndDelete({ _id: id });
        
        if (!deletedUser) {
            // Handle the case where the user with the given ID is not found
            return res.status(404).send('User not found');
        }

        const deletedEmail = deletedUser.email;

        // If the deleted user is the currently logged-in user, destroy the session
        if (req.session.user && req.session.user === deletedEmail) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                    return res.status(500).send('Internal Server Error');
                }
                // res.redirect('/'); // Redirect to login page or any other appropriate page
            });
        } else {
          
            // No need to destroy the session if the deleted user is not the current user
            // res.redirect('/adminDashboard');
            const users =await user.find()
            res.render('adminDashboard',{ users })
        }
        const users =await user.find()
                res.render('adminDashboard',{ users })

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { deleteuser };

const adminsignout = (req, res) => {
    if (req.session.admin) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/admin'); // Redirect to login page or any other appropriate page
        });
    } else {
        res.redirect('/admin'); // If session doesn't exist, redirect to login page
    }
};




const adminhome=(req,res)=>{

    if (req.session.admin) {
         res.render('adminDashboard')
    } else {
        res.redirect('/admin')
    }
    // here just rendering the page 
}

const useradded=async(req,res)=>{

    let emailcheck=await user.findOne({email:req.body.email})
    if (emailcheck) {
      res.render('adduser',{ existerorr: 'Same user Exist' });
     
    } else {
        const hashedPassword = await crypting(req.body.password);
      let usernew = new user({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          is_admin: 0
        });
            usernew.save();
  
            res.render('adduser',{ existerorr: 'signup completed login now' });
    }
     
  }
    // here just rendering the page 




module.exports={
    adminLogin,
    admincheck,
    adduser,
    edituser,
    deleteuser,
    adminsignout,
    adminhome,
    useredited,
    useradded
   
} 


