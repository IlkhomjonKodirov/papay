const assert = require("assert");
const { shapeIntoMongooseObjectID } = require("../lib/config");
const Definer = require("../lib/mistake");
const ProductModel = require("../schema/product.model");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }

  async addNewProductData(data, member) {
    try {
      // memberId ni MongoDB ObjectId ga aylantiramiz. Chunki member ichidagi Id oddiy string holatida emas MongoDb Object holatida bo'lishi kerak
      data.restaurant_mb_id = shapeIntoMongooseObjectID(member._id);

      const new_product = new this.productModel(data);
      const result = await new_product.save();

      assert.ok(result, Definer.product_err1);
      return result;

      return true;
    } catch (err) {
      throw err;
    }
  }

  async updateChosenProductData(id, updated_data, mb_id) {
    try {
      // kirib kelgan id ni check qilib agar mongodbObject bo'lmasa mongodbObjectga aylantirsin
      id = shapeIntoMongooseObjectID(id);
      mb_id = shapeIntoMongooseObjectID(mb_id);

      const result = await this.productModel
        .findOneAndUpdate(
          { _id: id, restaurant_mb_id: mb_id },
          updated_data,
          {
            runValidators: true,
            lean: true,
            returnDocument: "after",
          } // o'zgargan qiymatni ko'rish uchun frontendga yuborsin
        )
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
