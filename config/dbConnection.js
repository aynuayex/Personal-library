const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    if (!process.env.DB) {
      throw new Error("DB is not defined");
    }
    await mongoose.connect(process.env.DB);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
