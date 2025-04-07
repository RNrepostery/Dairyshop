import React, { useEffect, useState } from "react";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import moment from "moment"; // ✅ Fix: Correct import

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/orders`);
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  console.log("orders are ",orders);

  return (
    <>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => (
  <div className="border shadow" key={o._id}>
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Buyer</th>
          <th>Date</th>
          <th>Payment</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{i + 1}</td>
          <td>{o?.status}</td>
          <td>{o?.user?.name}</td> {/* ✅ Fix: Changed "buyer" to "user" */}
          <td>{moment(o?.createdAt).fromNow()}</td> {/* ✅ Fix: Corrected property */}
          <td>{o?.paymentInfo?.paymentId ? "Success" : "Failed"}</td> {/* ✅ Fix */}
          <td>{o?.products?.length}</td>
        </tr>
      </tbody>
    </table>
              <div className="container">
                {o?.products?.map((p) => (
                  <div className="row mb-2 p-3 card flex-row" key={p.productId}>
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/product/product-photo/${p.productId}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100px"
                        height="100px"
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{p.name}</p>
                      <p>{p.description?.substring(0, 30)}</p>
                      <p>Price: {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;

