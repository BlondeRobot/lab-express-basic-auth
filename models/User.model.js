const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Email is required."],
   //match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    //unique: true,
    //lowercase: true,

  },

  password: {
    type: String,
    required: [true, "Password is required."],
  },
});

const User = model("User", userSchema);

module.exports = User;
