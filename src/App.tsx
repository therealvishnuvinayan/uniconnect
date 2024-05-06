import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:name" element={<DetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
