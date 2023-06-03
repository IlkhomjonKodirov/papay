const Member = require ("../models/Member");

let restaurantController  = module.exports; 

// backendni ichida ejs orqali frontend qurilayotgani uchun get orqali kerakli pagega borish kerak bo'ladi
restaurantController.getSignupMyRestaurant = async (req, res) => {
  try{
    console.log("GET: cont/getSignupMyRestaurant");
    res.render('signup'); // res.render() - biror page berish kerak bo'lsa ishlatiladi. signup.ejs page iga yuboradi
  } catch(err){
    console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
    res.json({state: 'fail', message: err.message  });
  }
}

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signupProcess");
    const data = req.body,
      member = new Member(), 
      new_member = await member.signupData(data); 

    res.json({state: "succeed", data: new_member})
  } catch(err){
    console.log(`ERROR, cont/signupProcess, ${err.message}`);
    res.json({state: 'fail', message: err.message  });
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try{
    console.log("GET: cont/getLoginMyRestaurant");
    res.render('login-page'); // res.render() - biror page berish kerak bo'lsa ishlatiladi. login-page.ejs page iga yuboradi
  } catch(err){
    console.log(`ERROR, cont/getLoginMyRestaurant, ${err.message}`);
    res.json({state: "fail", message: err.message });
  }
}

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/loginProcess");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);

    res.json({state: "succeed", data: result })
  } catch(err){
    console.log(`ERROR, cont/loginProcess, ${err.message}`);
    res.json({state: 'fail', message: err.message})
  }
};
  
restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifadasiz");
};





