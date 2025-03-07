const express = require("express");
const app = express();
const port = 7777;

const { userAuth, adminAuth } = require("../middlewares/auth");


app.get("/user/:userId/:password", userAuth, (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Divyansh", lastName: "Suwalka" });
});

app.get("/admin", adminAuth, (req, res) => {
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