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
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
// const payments     = require('./routes/paymentRoute');

//middlewares for parsing data
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//setup the cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

connectDB();

//middleware to handle errors
app.use(errorMiddleWare);

//routes URIs
app.use("/api/v3/", products);
app.use("/api/v3/", auth);
app.use("/api/v3/", order);
// app.use('/api/v3/', payments);

// app.get('/', (req, res) => {
//     res.json({message: 'Hello from server!'})
// });
const PORT = 5000 || process.env.PORT;

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
