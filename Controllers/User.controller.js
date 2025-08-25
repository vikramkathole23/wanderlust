const usermodel = require("../model/user.models");
const { sendRegistrationMail } = require("../public/js/emailsender.js");

module.exports.UserRegisterForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.EmailVerificationPage = async (req,res) => {
  res.render("users/emailVerify.ejs");
}

module.exports.RegisterUser = async (req, res) => {
  try {
    let { username, password, email } = req.body;
    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    let NewUser = new usermodel({
      username,
      email,
      verificationCode,
      isVerified: false,
    });
    let RegisteredUser = await usermodel.register(NewUser, password);
    await sendRegistrationMail(email, username, verificationCode);
    req.login(RegisteredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User registered successfully! Check your email for verification code.");
      res.redirect("/verify");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.varifyEmail = async (req,res) => {
  try {
    const {code} = req.body
    const User = await usermodel.findOne({verificationCode:code})
    if(!User){
      req.flash("error", "Invalid or expired code.");
      return res.redirect("/verify");
    }

    // if user exist 
    User.isVerified = true;
    User.verificationCode = "undefined";
    await User.save();

    req.flash("success", "Email verified successfully!");
    res.redirect("/listings");
  } catch (error) {
    console.log("verify error:",error);
    
  }
}
// module.exports.sendRegistrationCodeToEmail= async ()

module.exports.UserLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.UserLogin = (req, res) => {
  const redirectUrl = req.session.returnTo || "/listings";
  delete req.session.returnTo;
  req.flash("success", "Welcome back to Wonderlust!!");
  res.redirect(redirectUrl);
};
