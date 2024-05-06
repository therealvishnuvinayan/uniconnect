import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { IUniversity, getUniversities } from "./models/universtityApis";

const App: React.FC = () => {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getUniversities();
      setUniversities(data);
    }
    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage universities={universities} />} />
        <Route
          path="/details/:name"
          element={<DetailPage universities={universities} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
