import React from "react";
import GlobalStyle from "styles/GlobalStyle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@pages/Login";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
