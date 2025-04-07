
const express = require('express');

const { requireSignIn, isAdmin } = require('../middle/authMiddleware.js');
const { createCategoryController, updateCategoryController, categoryControlller, deleteCategoryController, singleCategoryController } = require ('../Controllers/CategoryController.js')


const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

module.exports = router; 