const MemberModel = require('../schema/member.model');
const Definer = require("../lib/mistake");

class Member {
  constructor() {
    this.memberModel = MemberModel; // memberModel - mongoDBni classi
  }

  async signupData(input) {
    try {
      const new_member = new this.memberModel(input); // member schema nodullar class sifatida foydalanib, uning ichiga datani berib, yangi object hosil qilib, uning ichidagi save() metodidan foydalangan holda o'sha memberni hosil qilamiz
      let result;
      try {
        result = await new_member.save();
      } catch(mongo_err) {
        console.log(mongo_err);  
        throw new Error(Definer.auth_err1);
      }    
    
      result.mb_password = "";
      return result;
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Member;
