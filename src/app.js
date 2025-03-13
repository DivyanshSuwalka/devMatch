const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

const app = express();
const port = 7777;

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter, profileRouter, requestRouter);

connectDB()
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  })
  .catch((err) => {
    console.error("Cannot connect to DB");
  });

// const { validateSignUpData } = require("./utils/validation");
// const User = require("./models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { userAuth } = require("./middlewares/auth");

// creating a new user
// app.post("/signup", async (req, res) => {
//   try {
//     if (req.body?.skills?.length > 10)
//       throw new Error("Skills cannot be more than 10");
//     // validation of data
//     validateSignUpData(req);
//     // encrypting password
//     const { firstName, lastName, emailId, password } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);
//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       password: passwordHash,
//     });
//     await user.save();
//     res.send(user.firstName + " added successfully");
//   } catch (error) {
//     res.status(400).send("Error : " + error.message);
//   }
// });

// login existing user
// app.post("/login", async (req, res) => {
//   try {
//     const { emailId, password } = req.body;
//     const user = await User.findOne({ emailId: emailId });
//     if (!user) throw new Error("Invalid credentials!");
//     const isPasswordValid = user.validatePassword(password);  // bcrypt.compare(password, user.password);
//     if (isPasswordValid) {
//       // creating a jwt token  ( DEV@Tinder$790 ) => password only known to the server
//       // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
//       //   expiresIn: "1d",
//       // });
//       const token = await user.getJWT(); // getJWT() is in userSchema
//       // add token to cookie and send res to user
//       res.cookie("token", token);   // {expires: new Date(Date.now() + 8 * 3600000)}
//       res.send("Login successful for " + user.firstName);
//     } else throw new Error("Invalid credentials!");
//   } catch (error) {
//     res.status(400).send("Error : " + error.message);
//   }
// });

// after login, profile section
// app.get("/profile", userAuth, async (req, res) => {
//   try {
//     const user = req.user;
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("Error : " + error.message);
//   }
// });

// app.post("/sendConnectionRequest", userAuth, async (req, res) => {
//   try {
//     const user = req.user;
//     res.send(user.firstName + " sent the connection request!");
//   } catch (error) {
//     res.status(400).send("Error : " + error.message);
//   }
// });
