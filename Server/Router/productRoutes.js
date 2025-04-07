const express = require('express');
const dotenv = require('dotenv')
const { requireSignIn, isAdmin } = require('../middle/authMiddleware.js');
const { getProductController, getSingleProductController, productPhotoController, deleteProductController,  createProductController,  updateProductController, productFiltersController, productCountController, productListController, searchProductController, realtedProductController, productCategoryController, paymentController, braintreeTokenController, brainTreePaymentController, createOrder, verifyPayment } = require ('../Controllers/productController.js')
const formidable = require("express-formidable");
const paypal = require("@paypal/checkout-server-sdk");

require("dotenv").config();


//routes
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product

router.get("/search/:keyword", searchProductController);

//similar product
 router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);



router.post("/razorpay/order", createOrder);
router.post("/razorpay/verify", verifyPayment);

module.exports = router; 