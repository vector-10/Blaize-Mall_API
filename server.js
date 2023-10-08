require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// import routes
const products = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const auth = require("./routes/authRoute");
const connectDB = require("./database.js/connect");
const errorMiddleWare = require("./middleware/errors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const payments     = require('./routes/paymentRoute');

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-with, Content-Type, Accept"
//   );
// });

//middlewares for parsing data
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//cors policy for front-end access
const allowedOrigins = "http://localhost:5173";
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request's origin is in the allowedOrigins array
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

//Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log(`Shutting down due to uncaught exception`);
  process.exit(1);
});
//middleware to handle errors

app.use(errorMiddleWare);
//to allow cookies

//routes URIs
app.use("/api/v3/", products);
app.use("/api/v3/", auth);
app.use("/api/v3/", order);
// app.use('/api/v3/', payments);

const PORT = 5000 || process.env.PORT;
// call connect to database function
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is listening on PORT ${process.env.PORT}`);
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to unhandled Promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
