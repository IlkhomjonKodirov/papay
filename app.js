console.log('Web serverni boshlash');
const express = require("express");
const app = express();
const router = require("./router.js");
const router_bssr = require("./router_bssr.js");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions", // Mongodb ichida shu nom bn collection ochiladi va uning ichida authenticationlar yoziladi
});

// 1 -bosqich: Kirish kodlari 
app.use(express.static("public")); 
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

// 2-bosqich: Sessionga bog'liq kodlar
// Bizga keladigan har qanday request cherez seesionlar orqali o'tadi(validation qilinadi)
app.use(
  session({
    secret: process.env.SESSION_SECRET, // 
    cookie: {
      maxAge: 1000 * 60 * 30, // for 30 minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

// har bir kelayotgan request uchun quyidagi mantiq:
app.use(function(req, res, next) {
  res.locals.member = req.session.member; // sessionni ichidagi member objectini ma'lumotlarini bizning brauzerga yuborilyapti(res.locals.member)
  next();
})
// 3 - bosqich: viewsga bog'liq kodlar.
app.set("views", "views");
app.set("view engine", "ejs");

// 4 - bosqich: Routingga bog'liq kodlar          
app.use("/resto", router_bssr); // ananaviy (faqat admin va restaurant userlar uchun)
app.use("/", router);           // react (haridorlar uchun)


module.exports = app;

