const express = require('express');
const { userRegister, userLogin, testController, forgotPasswordController, updateProfileController, getOrdersController , getAllOrdersController, orderStatusController, getAllUsers } = require('../Controllers/Authenticate.js');
const { requireSignIn, isAdmin } = require('../middle/authMiddleware.js');
const { braintreeTokenController, brainTreePaymentController } = require('../Controllers/productController.js');

const router = express.Router();

// Route for user registration
router.post('/register', userRegister);

// Route for user login
router.post('/login', userLogin);


// forget password
router.post("/forgot-password", forgotPasswordController);

//test router
router.get('/test',  requireSignIn, isAdmin ,testController)

//protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });




  //protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requireSignIn, updateProfileController);


router.get("/orders", requireSignIn, getOrdersController);



//all orders
router.get("/all-orders", requireSignIn, isAdmin,  getAllOrdersController);

router.get("/all-users",  getAllUsers);



// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

 


module.exports = router; 

// {    
//     "name":"shristi",
//     "phone":"1234567897",
//     "password":"12345678"
//   }
