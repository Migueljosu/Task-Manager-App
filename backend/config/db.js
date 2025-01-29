const mongoose = require("mongoose");
require("dotenv").config(); // Carregar variáveis do arquivo .env

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.error("Error connecting to MongoDB:", err));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
