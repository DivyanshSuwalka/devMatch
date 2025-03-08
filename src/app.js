const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
const port = 7777;

app.use(express.json());

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
app.patch("/user", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByIdAndUpdate({ _id: req.body.id }, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update failed!\n"+ err.message);
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

app.post("/signup", async (req, res) => {
  console.log(req.body);

  // const userObj = {
  //   firstName: "Divyansh",
  //   lastName: "Suwalka",
  //   emailId: "div@gmail.com",
  //   password: "testing"
  // }
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send("Error saving the user: " + error.message);
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
