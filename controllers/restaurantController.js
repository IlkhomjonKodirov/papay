const Member = require("../models/Member");
const Product = require("../models/Product");

let restaurantController = module.exports;

restaurantController.home = (req, res) => {
  try {
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR, cont/home, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getMyRestaurantProducts = async (req, res) => {
  // Product malumotlarni databasedan chaqirib olib, restoran-menu ejs pageda kutib oladi
  try {
    console.log("GET: cont/getMyRestaurantProducts");
    //TODO: Get my restaurant products
    const product = new Product();
    const data = await product.getAllProductsDataResto(res.locals.member); // shu restorantning productlistini olib beradi
    res.render("restaurant-menu", { restaurant_data: data });
  } catch (err) {
    console.log(`ERROR, cont/getMyRestaurantProducts, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

// backendni ichida ejs orqali frontend qurilayotgani uchun get orqali kerakli pagega borish kerak bo'ladi
restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyRestaurant");
    res.render("signup"); // res.render() - biror page berish kerak bo'lsa ishlatiladi. signup.ejs page iga yuboradi
  } catch (err) {
    console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signupProcess");
    const data = req.body,
      member = new Member(),
      new_member = await member.signupData(data);

    req.session.member = new_member; // req sessionni ichiga new_memberni save qildik
    // Keyinchalik shu req sessionni ustanovka qilingandan kn, keyingi zapros qilinganda server kim zapros qilgan ekanligini taniydi.
    // yuborayotgan req session ichidida member objectining ichidan req qilgan odamning ma'lumotlarini olish imkoniyatiga ega bo'ladi

    // res.redirect - boshqa pagega yuborish
    res.redirect("/resto/products/menu"); // shu pagega yuboradi va u yerda new_member datalarini o'qish mumkin
  } catch (err) {
    console.log(`ERROR, cont/signupProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page"); // res.render() - biror page berish kerak bo'lsa ishlatiladi. login-page.ejs page iga yuboradi
  } catch (err) {
    console.log(`ERROR, cont/getLoginMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/loginProcess");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN"
        ? res.redirect("/resto/all-restaurant")
        : res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`ERROR, cont/loginProcess, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifadasiz");
};

restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member; // requestni member qismiga tenglashtirib olyapmiz
    next(); // -> keyingi qadamga o'tishga ruxsat berish
    console.log(req.member);
  } else
    res.json({
      state: "fail",
      message: "only authenticated members with restaurant type",
    });
};

restaurantController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "succeed", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authentication" });
  }
};
