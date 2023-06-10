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
    } catch(err) {
      throw err;
    }
  }
}

module.exports = Product;