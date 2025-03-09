const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      required: true,
      unique: true,
      type: String,
      lowerCase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value))
          throw new Error("Email invalid : " + value);
      },
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)) throw new Error("Use Strong Password!")
      }
    },
    age: {
      type: Number,
      min: 16,
      max: 99,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value))
          throw new Error("Gender is not valid");
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20220607/ourmid/pngtree-person-gray-photo-placeholder-man-in-a-shirt-on-gray-background-png-image_4853799.png",
      validate(value){
        if(!validator.isURL(value)) throw new Error("URL is invalid!")
      }
    },
    about: {
      type: String,
      default: "This is the default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
