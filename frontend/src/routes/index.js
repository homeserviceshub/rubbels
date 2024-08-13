import React from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import Link
import Home from "../pages/home";
import Layout from "../components/layout";
import AllProducts from "../pages/allProducts";
import Product from "../pages/product";
import MyCart from "../pages/myCart";
import Favourites from "../pages/favourites";

import ResetPasword from "../pages/auth/resetPassword";
import Checkout from "../pages/checkout";
import SignIn from "../pages/auth/signin";
import Signup from "../pages/auth/signup";
import DirectCheckout from "../pages/checkout/directCkeckout";
import Thankyou from "../pages/thankyou/thankyou";
import Admin from "../pages/admin/admin";
import AddProduct from "../pages/admin/addProduct";
import AlterProduct from "../pages/admin/alterProduct";
import DeleteProduct from "../pages/admin/DeleteProduct";
import Profile from "../pages/profile";

export default function AppRoutes() {
  const id = localStorage.getItem("auth");
  console.log(id);
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPasword />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tshirts" element={<AllProducts />} />
          <Route path="/tshirt/:id" element={<Product />} />
          <Route path="/:id/profile" element={<Profile />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/letmemakesomechangesinwebsite" element={<Admin />} />
          <Route
            path="/letmemakesomechangesinwebsite/newproduct"
            element={<AddProduct />}
          />
          <Route
            path="/letmemakesomechangesinwebsite/alterproduct"
            element={<AlterProduct />}
          />
          <Route
            path="/letmemakesomechangesinwebsite/deleteproduct"
            element={<DeleteProduct />}
          />
          <Route path="/checkout/:id" element={<DirectCheckout />} />
          <Route path="/thankyou/:id" element={<Thankyou />} />
          <Route
            path="/favourites"
            element={id.length > 0 ? <Favourites /> : <Navigate to="/signin" />}
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}
