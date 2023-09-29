import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../components/layout";

export default function AppRoutes() {
  return (
    <HashRouter basename="/">
      <Routes>
        {/* <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/reset-password" element={<ResetPasword />} /> */}

        <Route element={<Layout />}>
          {/* <Route element={<AuthCheckRoute />}> */}
          <Route path="/" element={<Home />} />
          {/* </Route> */}
        </Route>
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </HashRouter>
  );
}
