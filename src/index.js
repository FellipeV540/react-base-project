
import React from "react";
import { createRoot } from "react-dom/client";

import Home from "./pages/Home";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { auth } from "./config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Clinica from "./pages/Clinica";
import Modelagem from "./pages/Modelagem";
import Radiosinoviortese from "./pages/Radiosinoviortese";
import SegmentacaoeQuantificacao from "./pages/SegmentacaoeQuantificacao";
import DosimetriaPreClinica from "./pages/DosimetriaPreClinica";

const container = document.getElementById("root");
const root = createRoot(container);

onAuthStateChanged(auth, (user)=> {
  if (user) {
    window.sessionStorage.setItem("accessToken", user.accessToken);
  } else {
    window.sessionStorage.removeItem("accessToken");
  }
});

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/clinica" element={<Clinica/>} />
        <Route path="/modelagem" element={<Modelagem/>} />
        <Route path="/radiosinoviortese" element={<Radiosinoviortese/>} />
        <Route path="/SegmentacaoeQuantificacao" element={<SegmentacaoeQuantificacao/>} />
        <Route path="/dosimetriapreclinica" element={<DosimetriaPreClinica/>} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
