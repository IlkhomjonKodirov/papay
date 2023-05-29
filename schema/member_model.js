const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    mb_nick: {
      type: String,
      required: true,
      index: {unique: true, sparse: true} // avval ishlatilgan nicknameni qayta ishlatib bo'lmaydigan qiladi
    },
    mb_phone: {
      type: String,
      required: true,
    },
    mb_password: {
      type: String,
      require: true,
      select: false, // password maxfiy ma'lumot bo'lganligi uchun, buni keyinchalik request qilayotgan paytda bizga database bydefault holatda qaytarmasligi uchun yoziladi
    },
    mb_type: {
      type: String,
      required: false,
      default: "USER",
      enum: {
        values: member_type_enums,
        message: "{VALUE} is not among permitted values"
      }
    },
    mb_status: {
      type: String,
      require: false,
      default: "ACTIVE",
      enum: {
        values: member_status_enums,
        message: "{VALUE} is not among permitted values"
      }
    },
    mb_address: {
      type: String,
      required: false,
    },
    mb_description: {
      type: String,
      required: false,
    },
    mb_image: {
      type: String,
      required: false,
    },
    mb_point: {
      type: Number,
      required: false,
      default: 0,
    },
    mb_top: {
      type: Number,
      required: false,
      default: "N",
      enum: {
        values: ordenary_enums,
        message: "{VALUE} is not among permitted values"
      }
    },
    mb_views: {
      type: Number,
      required: false,
      default: 0,
    },
    mb_likes: {
      type: Number,
      required: false,
      default: 0,
    },
    mb_follow_cnt: {
      type: Number,
      required: false,
      default: 0,
    },
    mb_subcriber_cnt: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {timestamps: true} // createdAt, updatedAt
);

module.exports = mongoose.model("Member", memberSchema); // "Member"- kelajakdagi databasemizdagi tablitsani avtomatik ravishda Members qilib ochib beradi

/*
Hosil qilingangan memberSchema model orqali Member.js dagi 
Member modelining ichida database bilan turli hil operatsiyalarni amalga oshiriladi 
*/
