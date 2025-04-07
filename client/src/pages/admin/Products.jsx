import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu';
import axios from "axios";

import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const Products = () => {
    const [products, setProducts] = useState([]);
  
    //getall products
    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/get-product`);
        setProducts(data.products);
      } catch (error) {
        console.log(error);
        toast.error("Someething Went Wrong");
      }
    };
  
    //lifecycle method
    useEffect(() => {
      getAllProducts();
    }, []);
    return (
      <>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="text-center">All Products List</h1>
            <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
              key={p._id}
              to={`/dashboard/admin/update-product/${p.slug}`}
              className="product-link"
            >
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <p className="card-text">$ {p.price}</p>
                  
                </div>
              </div>
              </Link>
            ))}
          </div>
          </div>
        </div>
      </>
    );
  };
  

export default Products
