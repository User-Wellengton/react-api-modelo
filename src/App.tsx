import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProdutoListar from "./components/Produto/ProdutoListar";
import Navbar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";

const App: React.FC = function () {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Produto" element={<ProdutoListar />} />
      </Routes>
    </Router>
  );
};

export default App;
