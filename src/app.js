const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
const port = 7777;

app.post("/signup", async (req, res) => {
  // const userObj = {
  //   firstName: "Divyansh",
  //   lastName: "Suwalka",
  //   emailId: "div@gmail.com",
  //   password: "testing"
  // }
  const user = new User({
    firstName: "Ayush",
    lastName: "Suwalka",
    emailId: "suw@gmail.com",
    password: "testing",
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Error saving the user: "+error.message)
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
