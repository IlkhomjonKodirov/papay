console.log('Web serverni boshlash');
const express = require("express");
const app = express();
const router = require("./router");

// //MongoDB chaqirish
// const db = require("./server").db();// mongoDB instanceni(objectini) olib beradi. Va shu orqali CRUD operatsiyalarini amalga oshiramiz
// const mongodb = require("mongodb");

// 1 -bosqich: Kirish kodlari 
app.use(express.static("public")); 
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

// 2-bosqich: Sessionga bog'liq kodlar

// 3 - bosqich: viewsga bog'liq kodlar.
app.set("views", "views");
app.set("view engine", "ejs");

// 4 - bosqich: Routingga bog'liq kodlar
app.use("/", router);


module.exports = app;