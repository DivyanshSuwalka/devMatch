const express = require("express");

const app = express();
const port = 7777;

app.use("/hello", (req, res) => {
    res.send("Hello Hello");
});

app.use("/test", (req, res) => {
    res.send("Hello from the server");
});

app.use("/", (req, res) => {
  res.send("Hello from the Dashboard");
});

app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
});
