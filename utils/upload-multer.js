const path = require("path");
const multer = require("multer");
const uuid = require("uuid");

// MULTER IMAGE UPLOADER // adress - products, members, community lardan biri
function getTargetImageStorage(address) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      console.log(file);
      const extension = path.parse(file.originalname).ext;
      const random_name = uuid.v4() + extension;
      cb(null, random_name);
    },
  });
}

const makeUploader = (address) => {
  const storage = getTargetImageStorage(address); //
  return multer({storage: storage}) // Buyerda storage multerni talab etilgan indexi
}
module.exports = makeUploader;

// const product_storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/products");
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     const extension = path.parse(file.originalname).ext;
//     const random_name = uuid.v4() + extension;
//     cb(null, random_name);
//     // sonlar va harflardan iborat random qiymatni hosil qilib beradi
//     // Sababi: bir qancha userlar bir xil nomli faylni yuklashi mumkin bo'lganligi uchun random qilib nomi o'zgargan holdan yuklanyapti
//   },
// });
// module.exports.uploadProductImage = multer({ storage: product_storage });

/*
Documentationga ko'ra diskStorageni hosil qilib, uning ichiga destination( ya'ni qayerga yuklash)
req keladi va fileni oladi va cb bo'ladi. ./uploads/products manziliga yuklaydi
*/
