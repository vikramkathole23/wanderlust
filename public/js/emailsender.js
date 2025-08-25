    const nodemailer = require("nodemailer")


    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "vikramkathole225@gmail.com",
        pass: "ukim wnoy hljw ibzh",
      },
    });

    const sendRegistrationMail = async (toEmail, userName,Code) => {
        try {
        const info =await transporter.sendMail({
          from: `"email from" <vikramkathole225@gmail.com>`,
          to:toEmail,
          subject: " Welcome to Wanderlust – Your Journey Starts Here!",
          text: `Hello  ${userName}
              You registered an account on Wanderlust, before being able to 
              use your account you need to verify that this is your email address by
              clicking here:${Code}

              Kind Regards, Wanderlust`
        });
      console.log("Email send ", info.messageId);
      } catch (error) {
        console.log(error);
        
      }
    };
    
    module.exports = { sendRegistrationMail };