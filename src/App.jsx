import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import AddUser from "./pages/AddUser";
import User from "./pages/User";
import AddBusiness from "./pages/AddBusiness";
import AddProperty from "./pages/AddProperty";
import Business from "./pages/Business";
import Property from "./pages/Property";






const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin_signup" element={<AdminSignup />} />
        <Route path="/admin_Login" element={<AdminLogin />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/user/:uid" element={<User />} />
        <Route path="/addBusiness/:uid" element={<AddBusiness />} />
        <Route path="/addProperty/:uid" element={<AddProperty />} />
        <Route path="/biz/:bid" element={<Business />} />
        <Route path="/property/:pid" element={<Property />} />


      </Routes>
    </div>
  )
}

export default App
