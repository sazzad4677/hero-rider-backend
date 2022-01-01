const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Import Routes
const authRoute = require("./routes/auth");
// Dot Env
dotenv.config();
// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParams: true }, () =>
  console.log("Connected to DB")
);

// Middleware
app.use(express.json());

app.use(cors());

//Route middleware
app.use("/api/user", authRoute);

// MiddleWare to handle errors
app.use(errorMiddleware);

const server = app.listen(5000, () =>
  console.log(
    `Server is running on PORT ${process.env.PORT} in ${process.env.NODE_ENV}`
  )
);

// Handel Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

// Handel Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandledRejection");
  server.close(() => {
    process.exit(1);
  });
});
