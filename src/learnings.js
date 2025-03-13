const express = require("express");
const app = express();
const port = 7777;

// const { userAuth, adminAuth } = require("../middlewares/auth");


app.get("/user/:userId/:password", (req, res) => {    // userAuth, 
  console.log(req.params);
  res.send({ firstName: "Divyansh", lastName: "Suwalka" });
});

app.get("/admin", (req, res) => {   // adminAuth, 
  console.log(req.query);
  res.send({ firstName: "Divyansh", lastName: "Suwalka" });
});

app.post("/user", (req, res) => {
  res.send("Data is saved successfully to DB");
});

app.delete("/user", (req, res) => {
  res.send("Data is deleted successfully from DB");
});

app.patch("/user", (req, res) => {
  res.send("Data is altered(patch) in DB");
});

app.use("/", (err, req, res, next) => {
  if (err) res.status(500).send("Something went wrong!");
  res.send("Hello from the Dashboard");
});

app.listen(port, () => {
    console.log(`Server is listening on ${port} port`);
  });



  
/**
 *
 *
 *
 *
 *
 */

/**
 * //delete user from database using id
app.delete("/user/:id", async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete({ _id: req.body.id});
    // const user = await User.findByIdAndDelete(req.body.id);
    const user = await User.findByIdAndDelete(req.params.id);
    console.log(user);
    if (!user) throw new Error("User not found!");
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});
 */

/**
 * // (/profile get route)
const { token } = req.cookies;
if (!token) throw new Error("Invalid Token!");
// validate my token
const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
console.log(decodedMessage);
const { _id } = decodedMessage;
const user = await User.findById(_id);
 */

// update data of the user using id as a reference
/**
 * app.patch("/user/:id", async (req, res) => {
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
  { returnDocument: "after", runValidators: true }
);
console.log(user);
if (!user) throw new Error("User not found!");
res.send("User updated successfully");
} catch (err) {
  res.status(400).send("Update failed!\n" + err.message);
}
});
*/

/**
 * // update using email as reference
app.patch("/user", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOneAndUpdate(
      { emailId: req.body.emailId },
      req.body,
      { returnDocument: "after" }
    );
    console.log(user);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});
*/

/**
 * // get a user from database
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
 */
