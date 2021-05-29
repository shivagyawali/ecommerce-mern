const Category = require("../models/Category");

exports.create = async (req, res) => {
  const { category } = req.body;

  const categoryExist = await Category.findOne({ category });
  if (categoryExist) {
    res.status(400).json({
      errorMessage: `${category} already exists`,
    });
  } else {
    try {
      let newCategory = new Category();
      newCategory.category = category;
      newCategory = await newCategory.save();
      res.status(200).json({
        category: newCategory,
        successMessage: `${newCategory.category} was created !`,
      });
    } catch (error) {
      console.log("Category creation error", error);
      res.status(500).json({
        errorMessage: "Please try again later",
      });
    }
  }

  // setTimeout(() => {
  //   console.log(req.user);
  //   res.json({
  //     successMessage: `${req.body.category} was created`,
  //   });
  // }, 2000);
};
exports.readAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.log("Error reading category", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
