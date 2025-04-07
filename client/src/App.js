import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import About from "./pages/About"; 
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import NotFound from "./pages/NotFound";
 
import Dashboard from "./pages/user/Dashboard";
import UserRoute from "./components/route/UserRoute";


import AdminRoute from "./components/route/AdminRoute";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ForgotPasssword from "./pages/Auth/ForgetPassword";
import AdminDashboard from "./pages/admin/Admindashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import AdminOrders from "./pages/admin/AdminOrders";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import CategoryProduct from "./pages/CategoryProduct";
import AllCategories from "./pages/AllCategories";
import AddToCart from "./pages/AddToCart";




function App() {
  return (
    <Router>
      
      <Header />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />

        <Route path="/categories" element={<AllCategories />} />
        <Route path="/carts" element={<AddToCart/>} />

        <Route path="/category/:slug" element={<CategoryProduct />} />

        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />

        {/* Protected User Routes */}
        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
         
        </Route>

          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
          <Route path="admin/product" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/order" element={<AdminOrders/>} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
