const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

// creating a new user
authRouter.post("/signup", async (req, res) => {
  try {
    if (req.body?.skills?.length > 10)
      throw new Error("Skills cannot be more than 10");
    // validation of data
    validateSignUpData(req);
    // encrypting password
    const { firstName, lastName, emailId, password, skills, age, gender, photoUrl, about } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      skills,
      age,
      gender, 
      photoUrl, 
      about
    });
    await user.save();
    res.send(user.firstName + " added successfully");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

// login existing user
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid credentials!");
    const isPasswordValid = user.validatePassword(password); // bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // creating a jwt token  ( DEV@Tinder$790 ) => password only known to the server
      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
      //   expiresIn: "1d",
      // });
      const token = await user.getJWT(); // getJWT() is in userSchema
      // add token to cookie and send res to user
      res.cookie("token", token); // , {expires: new Date(Date.now() + 8 * 3600000)}
      res.send("Login successful:\n\nHello " + user.firstName);
    } else throw new Error("Invalid credentials!");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout Successful!");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = authRouter;
