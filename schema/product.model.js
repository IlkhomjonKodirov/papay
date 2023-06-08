const mongoose = require("mongoose");
const {
  product_collection_enums,
  product_status_enums,
  product_size_enums,
  product_volume_enums,
} = require("../lib/config");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    product_collection: {
      type: String,
      required: true,
      enum: {
        values: product_collection_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_status: {
      type: String,
      required: false,
      default: "PAUSED",
      enum: {
        values: product_status_enums, // Enum
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_discount: {
      type: Number,
      required: false,
      default: 0,
    },
    product_left_cnt: {
      type: Number,
      required: true,
    },
    product_size: {
      type: String,
      default: "normal",
      required: function () {
        const sized_list = ["dish", "salad", "dessert"];
        return sized_list.includes(this.product_collection);
      },
      enum: {
        values: product_size_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_volume: {
      // asosan drink uchun kerak bo'ladi(litr bo'lganligi uchun)
      type: String,
      default: 1,
      required: function () {
        return this.product_collection === "drink";
      },
      enum: {
        values: product_volume_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_description: { type: String, required: true },
    product_images: { type: Array, required: false, default: [] },
    product_likes: {
      type: Number,
      required: false,
      default: 0,
    },
    product_views: {
      type: Number,
      required: false,
      default: 0,
    },
    restaurant_mb_id: {
      // MongoDB Object id si bn soxr qilish kerak. Kn uni biz population yoki aggregation qilishimiz mn.
      type: Schema.Types.ObjectId,
      ref: "Member", // referance qaysi database MongoDB collectionga bog'langanligini ko'rsatadi
      required: false,
    },
  },
  { timestamps: true }
); // createdAt, updatedAt (O'zi avtomatik ravishda create va uptade qilib beradi ), // Databaseni

productSchema.index(
  { restaurant_mb_id: 1, product_name: 1, product_size: 1, product_volume: 1 }, // Texas-De-Brazil, coca-cola, null, 2 (Shu 4 ta ko'rsatgich databaseda bo'lsa, 2-marta kiritilayotganda hatolik beradi)
  { unique: true } 
);

module.exports = mongoose.model("Product", productSchema);
