import React from "react";
import { NavLink, Link } from "react-router-dom";
import {Helmet} from "react-helmet";
import { useAuth } from "../context/Auth";
import SearchInput from "./form/SearchInput";
import useCategory from "../hooks/useCategory";
import { useCart } from "../context/cart";


// import useCategory from "../../hooks/useCategory";
// import { useCart } from "../../context/cart";
 import { Badge } from "antd";




const Header = ({title, description, keywords, author}) => {

  const [cart] = useCart();
  
  const categories = useCategory();
  const {auth, setAuth} = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user:null,
      token:''
    })
    localStorage.removeItem('auth');
  }

  console.log(categories,"categories");
  return (
    <>
      <Helmet>
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={ keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </div>
      </Helmet>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput/>
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                  <button
                      className="nav-link dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
               <li className="nav-item">
                <>
                  <NavLink to="/carts" className="nav-link">
                    cart {cart?.length}
                  </NavLink>
                </>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;