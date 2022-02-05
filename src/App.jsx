import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Create from "./pages/create/Create";
import Home from "./pages/Home/Home";
import Load from "./pages/load/Load";
import WalletManager from "./pages/wallet-manager/WalletManager";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/create' element={<Create/>}  />
        <Route path='/load' element={<Load/>} />
        <Route path='/wallet-manager/:selectedSafe' element={<WalletManager/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
