
import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "airbnb/components/footer/Footer";
import AuthModal from "airbnb/components/auth/AuthModal";

const page = () => {
  
  return <div>
    <Navbar/>
    <Footer/>
    <AuthModal />
  </div>;
};

export default page;
