const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true, unique: true }, // User's email
  password: { type: String, required: true }, // Hashed password
});

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password unchanged
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash password
  next();
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);
