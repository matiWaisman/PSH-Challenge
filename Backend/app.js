const express = require("express");
require("dotenv").config();
const populate = require("./populateDb");

const app = express();

const connectDB = require("./db/connect");

app.use(express.json());

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on port: ${PORT}....`));
  } catch (error) {
    console.log(error);
  }
};

start();
