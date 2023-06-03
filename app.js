console.log('Web serverni boshlash');
const express = require("express");
const app = express();
const router = require("./router.js");
const router_bssr = require("./router_bssr.js");

// let session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
// const store = new MongoDBStore({
//   uri: process.env.MongoDB_URL,
//   collection: "sessions",
// });

// 1 -bosqich: Kirish kodlari 
app.use(express.static("public")); 
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

// 2-bosqich: Sessionga bog'liq kodlar
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     cookie: {
//       maxAge: 1000 * 60 * 30, // for 30 minutes
//     },
//     store: store,
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// 3 - bosqich: viewsga bog'liq kodlar.
app.set("views", "views");
app.set("view engine", "ejs");

// 4 - bosqich: Routingga bog'liq kodlar          
app.use("/resto", router_bssr); // ananaviy (faqat admin va restaurant userlar uchun)
app.use("/", router);           // react (haridorlar uchun)


module.exports = app;

