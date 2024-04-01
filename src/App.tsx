import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProdutoListar from "./components/Produto/ProdutoListar";
import Navbar from "./components/NavBar/Navbar";

const App: React.FC = function () {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Seja Bem Vindo!</h1>} />
        <Route path="/Produto" element={<ProdutoListar />} />
      </Routes>
    </Router>
  );
};

export default App;
