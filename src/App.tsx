import React from "react";
import GlobalStyle from "styles/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@pages/Login";
import Home from "@pages/Home";
import Write from "@pages/Write";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/write" element={<Write />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
