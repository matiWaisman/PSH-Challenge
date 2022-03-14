const express = require("express");
const cors = require("cors");
const hackatonsRouter = require("./routes/hackatons");
const usersRouter = require("./routes/users");
require("dotenv").config();

const app = express();

const connectDB = require("./db/connect");
const populate = require("./populateDb");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/v1/users", usersRouter);
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

const notFound = require("./middleware/notFound");
app.use(notFound);

start();
