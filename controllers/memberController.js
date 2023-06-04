const Member = require("../models/Member");
let memberController = module.exports; // - memberController bu object. memberControllerga turli xil metodlarni yuklay olamiz

memberController.signup = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body,
      member = new Member(), // serviceModel(Member classi)ning instancesi
      new_member = await member.signupData(data); // signupData ichiga req.bodyni yuboramiz. req.body esa Member.jsdagi inputni o'rniga boradi

    res.json({state: 'succeed', data: new_member})
  } catch(err){
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({state: 'fail', message: err.message})
  }
};

memberController.login = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);

      // AUTHENTICATE BASED ON JWT

    res.json({state: 'succeed', data: result})
  } catch(err){
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({state: 'fail', message: err.message})
  }
};
  
memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifadasiz");
};





