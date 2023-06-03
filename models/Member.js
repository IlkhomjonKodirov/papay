const MemberModel = require('../schema/member.model');
const Definer = require("../lib/mistake");
const assert = require("assert");
const bcrypt = require('bcryptjs');

class Member {
  constructor() {
    this.memberModel = MemberModel; // memberModel - mongoDBni classi. member.model.js dagi class
  }

  async signupData(input) {
    try {
      const salt = await bcrypt.genSalt();
      input.mb_password = await bcrypt.hash(input.mb_password, salt);
      const new_member = new this.memberModel(input); // member schema modeldan class sifatida foydalanib, uning ichiga datani berib, yangi instance object hosil qilib, uning ichidagi save() metodidan foydalangan holda o'sha memberni hosil qilamiz

      let result; // result degan object
      //mongoDB boshqacha formatda hatolik berishi mumkin. O'sha hatolikni ushlab olish uchun yana try catch ishlatiladi
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


  async loginData(input) {
    try {
      const member = await this.memberModel
      .findOne(
        {mb_nick: input.mb_nick}, 
        {mb_nick: 1, mb_password: 1})// passwordni solishtirib olish uchun chaqiramiz. 1 degani kerak degani
      .exec();
      assert.ok(member, Definer.auth_err3); // agar biz kiritgan member signup qilgan member bo'lsa keyingi qadamga o'tadi, aks holda auth_err3 ni beradi

      const isMatch = await bcrypt.compare(
        input.mb_password, // inputdan kelayotgan
        member.mb_password // databaseda yozilgan password
      );
      assert.ok(isMatch, Definer.auth_err4);

      return await this.memberModel
      .findOne({
        mb_nick: input.mb_nick
      }).exec();
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Member;


