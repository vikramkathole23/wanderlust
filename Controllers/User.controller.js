const usermodel = require("../model/user.models");

module.exports.UserRegisterForm =  (req, res) => {
  res.render("users/signup.ejs");
}

module.exports.RegisterUser = async (req, res) => {
    try {
      let { username, password, email } = req.body;
      let NewUser = new usermodel({ username, email });
      let RegisteredUser = await usermodel.register(NewUser, password);
      req.login(RegisteredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to wanderlust!!");
        res.redirect("/listings");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  }


module.exports.UserLoginForm = (req, res) => {
  res.render("users/login.ejs");
}


module.exports.UserLogin = (req, res) => {
    const redirectUrl = req.session.returnTo || "/listings";
    delete req.session.returnTo;
    req.flash("success", "Welcome back to Wonderlust!!");
    res.redirect(redirectUrl);
  }
