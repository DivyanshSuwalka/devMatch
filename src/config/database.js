const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://suwalkadivyansh63:01ZwfA3BoY4T5oim@namastenode.fvcxe.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
