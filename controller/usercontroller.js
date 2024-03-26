const user = require('../model/usermodel')
const bcrypt = require('bcrypt');


// Hash the password
const crypting = (password)=>{
return bcrypt.hash(password, 10) 
}

// compairing the passwords after hashing

const comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  };


//register==============================================
const signup= (req,res)=>{
res.render("signup")
}
const home= (req,res)=>{
    if (req.session.user) {
        let movies = 
        [
            {
                name:"Counter-Strike",
                description: "2012",
                src:"https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2020/12/CSGO-Stat-Tracker-How-to-Use.jpg"
            },
            {
                name:"Call of Duty",
                description:"2020",
                src:"https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-REVEAL-FULL-TOUT.jpg"
            },
            {
                name:"Apex Legends",
                description:"2019",
                src:"https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_616x353.jpg?t=1700150367"
            }
        ];
        res.render('dashboard',{movies});
    } else {
        res.redirect("/")
    }
        
    }
    



const login=(req,res)=>{
if (req.session.user) {
    res.redirect('/home');
} else {
    res.render("login")
}
}

const trial=(req,res)=>{

   console.log(req.query.aa);

}   


const logincheck= async (req,res)=>{
    
    let usercheck =await user.findOne({email:req.body.email})

    if (usercheck && (await comparePasswords(req.body.password,usercheck.password) ) )
    {
        req.session.user=req.body.email 
        res.redirect('/home');
    } else {
        
        res.render('login',{ errorMessage: 'Invalid username or password' });
      
    }
}






// signup post method
const dashboard= async (req,res)=>{

    const hashedPassword = await crypting(req.body.password);
    let emailcheck=await user.findOne({email:req.body.email})
  if (emailcheck) {
    res.render('signup',{ existerorr: 'Same user Exist' });
   
  } else {
    let usernew = new user({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        is_admin: 0,
      });
          usernew.save();

          res.render('signup',{ existerorr: 'signup completed login now' });
  }
   
}
const usersignout=(req,res)=>{
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/'); // Redirect to login page or any other appropriate page
        });
 }




module.exports={
    signup,
    login,
    dashboard,
    trial,
    logincheck,
    home,
    usersignout
}