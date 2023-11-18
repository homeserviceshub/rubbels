import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom"; // Import Link
import Home from "../pages/home";
import Layout from "../components/layout";
import AllProducts from "../pages/allProducts";
import Product from "../pages/product";
import MyCart from "../pages/myCart";
import Favourites from "../pages/favourites";
import Signup from "../pages/auth/signUp";
import SignIn from "../pages/auth/signIn";
import ResetPasword from "../pages/auth/resetPassword";

export default function AppRoutes() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPasword />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tshirts" element={<AllProducts />} />
          <Route path="/tshirts/tshirt" element={<Product />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
