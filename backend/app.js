const express = require("express"); //import module express
const session = require('express-session');
//const cookieSession = require('cookie-session')
//const session = require("client-sessions");
const bodyParser = require("body-parser"); //import module body-parser
const mongoose = require("mongoose"); //import module mongoose
const cors = require("cors");
const passport = require("passport");
const Userrouter = require("./routes/auth");
const Livreurrouter=require("./routes/livreurRoute");

// creation app express
const app = express();


app.use(
  cors({
    origin: "http://localhost:4200", // Replace with your client's URL
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
// Security configuration cors issues// Set additional CORS headers if needed
// Security configuration
/*app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});*/

//mongoose setings
mongoose.set('strictQuery', false);
// MongoDB connection string

const connectionString = "mongodb://127.0.0.1:27017/2ndlife" ;
// Connect to MongoDB
mongoose.connect(connectionString).then(() => {
  console.log('Connected to MongoDB');
  // Start your application or perform database operations here
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error
  );
});

// body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*app.use(
  session({
    cookie: { ephemeral: true },
    cookieName: "session",
    secret: "your-secret-key",
    // Add other options if needed
  })
);*/

  app.use(
    session({
      secret: "2ndlife", // Replace with a strong secret key
      resave: false,
      saveUninitialized: true,
    })
  );
 /* // configure cookieSession middleware
  app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
  );
  */

  // configure passport.js middleware
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())


app.use("/auth", Userrouter);
app.use("/livreur", Livreurrouter);


  module.exports= app;
