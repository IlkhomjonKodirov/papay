const Member = require("../models/Member");
let memberController = module.exports; // - memberController bu object. memberControllerga turli xil metodlarni yuklay olamiz

memberController.signup = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body;
    const member = new Member();
    const new_member = await member.signupData(data);

    res.json({state: 'succeed', data: new_member})
  } catch(err){
    console.log(`ERROR, cont/signup, ${err.message}`);
    res.json({state: 'fail', message: err.message})
  }
};

memberController.login = (req, res) => {
  console.log("POST cont.login");
  res.send("login sahifadasiz");
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifadasiz");
};



