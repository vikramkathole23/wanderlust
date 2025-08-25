import express from "express";
import nodemailer from "nodemailer";
import path from "path";

const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.set('views', path.join(__dirname, 'views'));

app.get("/receivedata", (req, res) => {
  res.render("email.ejs");
});

app.post("/receivedata", async (req, res) => {
  const { to, subject, text } = req.body;

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

    const sendEmail = async () => {
      try {
        const info = await transporter.sendMail({
        from: `"email from" <vikramkathole225@gmail.com>`,
        to,
        subject: " Welcome to Wanderlust – Your Journey Starts Here!",
        text:`Hello Dear 
              You registered an account on [customer portal], before being able to 
              use your account you need to verify that this is your email address by
              clicking here:58537

              Kind Regards, [company]`
      });
      console.log("Email send ", info.messageId);
      } catch (error) {
        console.log(error);
        
      }
    };
    sendEmail();
    res.send("email send!");
});

app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
