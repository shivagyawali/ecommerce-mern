const Product = require("../models/Product");
const fs = require("fs");
exports.create = async (req, res) => {
  const { filename } = req.file;
  const {
    productName,
    productDesc,
    productCategory,
    productPrice,
    productQty,
  } = req.body;

  try {
    let product = new Product();
    product.fileName = filename;
    product.productName = productName;
    product.productPrice = productPrice;
    product.productDesc = productDesc;
    product.productCategory = productCategory;
    product.productQty = productQty;
    await product.save();
    res.status(200).json({
      successMessage: "Product Created",
      product,
    });
  } catch (error) {
    console.log("Product creation error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.read = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate(
      "productCategory"
    );
    res.json(product);
  } catch (err) {
    console.log(err, "productController.read error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
exports.readAll = async (req, res) => {
  try {
    const products = await Product.find({}).populate(
      "productCategory",
      "category"
    );
    res.json({ products });
  } catch (err) {
    console.log(err, "productController.readAll error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
exports.update = async (req, res) => {
  const productId = req.params.productId;

  req.body.fileName = req.file.filename;

  const oldProduct = await Product.findByIdAndUpdate(productId, req.body);

  fs.unlink(`uploads/${oldProduct.fileName}`, (err) => {
    if (err) throw err;
    console.log("Image successfully deleted from the filesystem");
  });

  res.json({
    successMessage: "Product successfully updated",
  });
};
exports.delete = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    //also delete image
    fs.unlink(`uploads/${deletedProduct.fileName}`, (err) => {
      if (err) throw err;
      console.log(
        "Image successfully deleted from filesystem",
        deletedProduct.fileName
      );
    });
    res.json(deletedProduct);
    res.status(200).json({
      successMessage: `${deletedProduct.productName} is deleted`,
    });
  } catch (err) {
    console.log(err, "productController.delete error");
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
