const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.findOneAndUpdate(
      { email: "test@gmail.com" },
      { role: "admin" },
      { new: true }
    );

    console.log("Updated User:");
    console.log(user);

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

makeAdmin();