const express = require("express");
const hackatonsRouter = require("./routes/hackatons");
require("dotenv").config();

const app = express();

const connectDB = require("./db/connect");
const populate = require("./populateDb");

const notFound = require("./middleware/notFound");

app.use(express.json());

app.use("/api/v1/hackatons", hackatonsRouter);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on port: ${PORT}....`));
  } catch (error) {
    console.log(error);
  }
};

app.use(notFound);

start();
