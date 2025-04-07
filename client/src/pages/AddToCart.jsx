import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/cart";
// import DropIn from "braintree-web-drop-in-react";



function AddToCart() {

  

  const { auth, setAuth} = useAuth();
  const [cart, setCart] = useCart();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const totalPrices = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
  
      console.log("Auth Object:", auth);
      console.log("User Data:", auth?.user);
      console.log("Cart Data:", cart);
  
      // if (!auth?.user || !auth?.user?._id) {
        
      //   setLoading(false);
      //   return console.log("User not logged in!");
      // }
  
      // Create Razorpay order
      const { data: order } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/product/razorpay/order`, {
        amount: totalPrices,
        currency: "INR",
      });
  
      console.log("Created Razorpay Order:", order);
  
      // Configure Razorpay options
      const options = {
        key: "rzp_test_4jG7wil4et5YAF", // Replace with your Razorpay test key
        amount: order.amount,
        currency: order.currency,
        name: "Your Store",
        description: "Payment for your order",
        order_id: order.id,
        handler: async (response) => {
          console.log("Razorpay Response:", response);
  
          const requestBody = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            cart,
            user: auth?.user || {}, // Ensure user is always sent
          };
  
          console.log("Sending Verification Request to Backend:", requestBody);
  
          // Verify payment on the backend
          const { data } = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/product/razorpay/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cart,
              user: { _id: auth?.user?.id || auth?.user?._id }, // Ensure correct ID is sent
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          console.log("Backend Verification Response:", data);
  
          if (data.success) {
            toast.success("Payment Successful!");
            setCart([]);
            localStorage.removeItem("cart");
            navigate("/dashboard/user/orders");
          } else {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: auth?.user?.name || "Guest",
          email: auth?.user?.email || "guest@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      console.log("Error Response Data:", error.response?.data);
      toast.error("Payment failed!");
    } finally {
      setLoading(false);
    }
  };
  

  

 

   //detele item
   const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

 //get payment gateway token


  // Increase Quantity
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bg-light p-2 mb-1">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-center">
            {cart?.length
              ? `You have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }`
              : "Your cart is empty"}
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          {cart?.map((p) => (
            <div key={p._id} className="row mb-2 p-3 card flex-row">
              <div className="col-md-4">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  width="100px"
                  height="120px"
                />
              </div>
              <div className="col-md-8">
                <p>{p.name}</p>
                <p>{p.description.substring(0, 30)}</p>
                <p>Price: ${p.price}</p>
               

                {/* Quantity Controls */}
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => decreaseQuantity(p._id)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={p.quantity}
                    readOnly
                    className="form-control text-center mx-2"
                    style={{ width: "50px" }}
                  />
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => increaseQuantity(p._id)}
                  >
                    +
                  </button>
                </div>
                <button
                    className="btn btn-danger mt-2 px-4 py-1 ms-1"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="col-md-4 text-center">
          <h2>Cart Summary</h2>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h4>Total: {totalPrice()} </h4>

          {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}

           <button className="btn btn-primary mt-2" onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Pay with Razorpay"}
          </button>
           
        </div>
      </div>
    </div>
  );
};







export default AddToCart;


