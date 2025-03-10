const express = require("express");
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const port = 7777;

app.use(express.json());
app.use(cookieParser());

//delete user from database using id
app.delete("/user", async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete({ _id: req.body.id});
    const user = await User.findByIdAndDelete(req.body.id);
    console.log(user);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

// update data of the user using id as a reference
app.patch("/user/:id", async (req, res) => {
  console.log(req.body);
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) throw new Error("Update not allowed");
    if (req.body?.skills.length > 10)
      throw new Error("Skills cannot be more than 10");

    const user = await User.findByIdAndUpdate(
      { _id: req.params?.id },
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    console.log(user);
    if (!user) throw new Error("User not found!");
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update failed!\n" + err.message);
  }
});

// update using email as reference
// app.patch("/user", async (req, res) => {
//   console.log(req.body);
//   try {
//     const user = await User.findOneAndUpdate(
//       { emailId: req.body.emailId },
//       req.body,
//       { returnDocument: "after" }
//     );
//     console.log(user);
//     res.send("User updated successfully");
//   } catch (error) {
//     res.status(400).send("Something went wrong!");
//   }
// });

// get a user from database
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    res.send(user);
    // const user = await User.find({ emailId: req.body.emailId });
    // if (user.length === 0) res.status(404).send("User not found!");
    // else res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

// get feed get all users from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

// creating a new user
app.post("/signup", async (req, res) => {
  console.log(req.body);

  try {
    if (req.body?.skills?.length > 10)
      throw new Error("Skills cannot be more than 10");
    // validation of data
    validateSignUpData(req);
    // encrypting password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

// login existing user
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid credentials!");
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // creating a jwt token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790"); // DEV@Tinder$790 => password only known to the server
      console.log(token);
      // add token to cookie and send res to user
      res.cookie("token", token);
      res.send("Login successful! \n");
    } else throw new Error("Invalid credentials!");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

// after login profile section
app.get("/profile", async (req, res) => {
  try {
    // const cookies = req.cookies;
    const { token } = req.cookies;
    if (!token) throw new Error("Invalid Token!");
    // validate my token
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
    console.log(decodedMessage);
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) throw new Error("User does not exist!");
    // console.log("The logged in user is : "+user.firstName);
    res.send(user);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});


connectDB()
  .then(() => {
    console.log("DB connected Successfully");

    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Cannot connect to DB");
  });
