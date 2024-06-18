// App.js
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Adminpg from "./Components/Pages/Admin";
import Home from "./Components/Pages/Home";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import Men from "./Components/Pages/Men";
import Women from "./Components/Pages/Women";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import Kids from "./Components/Pages/Kids";
import Cart from "./Components/Pages/Cart";
import Favorite from "./Components/Pages/Favorite";
import MainNavbar from "./Components/Common_pages/Main_navbar";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { userRefresh } from "./Components/Redux/ReduxCartData/CartDataAction";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  console.log("Redux Data", user);
  useEffect(() => {
    dispatch(userRefresh());
  }, []);

  return (
    <div className="App">
      {/* <MainNavbar /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/about" element={<About />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/admin/add-update" element={<Adminpg />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
