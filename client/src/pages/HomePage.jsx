import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import Prices from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getProducts(1, false); // Fetch initial products
  }, []);

  // Fetch products (with load more support)
  const getProducts = async (pageNum, append = true) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/product-list/${pageNum}`);
      setLoading(false);
      setProducts((prev) => (append ? [...prev, ...data.products] : data.products));
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // Load more products when the "Load More" button is clicked
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      getProducts(page);
    }
  }, [page]);

  // Handle filtering by category
  const handleFilter = (value, id) => {
    let updatedChecked = [...checked];
    if (value) {
      updatedChecked.push(id);
    } else {
      updatedChecked = updatedChecked.filter((c) => c !== id);
    }
    setChecked(updatedChecked);
  };

  // Fetch filtered products when filters change
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
      // setLoading(false);
      // disabled={loading}
    } else {
      getProducts(1, false);
    }
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className="btn btn-danger" onClick={() => window.location.reload()}>
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
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
                  <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      const existingProductIndex = cart.findIndex((item) => item._id === p._id);

                      if (existingProductIndex !== -1) {
                        // If product exists, increase quantity
                        const updatedCart = [...cart];
                        updatedCart[existingProductIndex].quantity += 1;
                        setCart(updatedCart);
                        localStorage.setItem("cart", JSON.stringify(updatedCart));
                      } else {
                        // If new product, add with quantity 1
                        const updatedCart = [...cart, { ...p, quantity: 1 }];
                        setCart(updatedCart);
                        localStorage.setItem("cart", JSON.stringify(updatedCart));
                      }
                    }}
                  >
                    ADD TO CART
                  </button>

                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3 text-center">
            {products.length < total && (
              <button className="btn btn-warning" onClick={loadMore} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
