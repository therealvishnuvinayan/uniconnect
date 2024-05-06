import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { IUniversity, getUniversities } from "./models/universtityApis";

const App: React.FC = () => {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUniversities();
        if(data === null || data.length === 0) {
          setError('Unable to fetch universities. Please try again later')
        } else {
          setUniversities(data)
        }
      } catch (error) {
        console.log('##reached else')
        console.error("unable to fetch data", error);
        setError("Unable to fetch universities, Please try again later");
      }
    }
    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage universities={universities} error={error} />} />
        <Route
          path="/details/:name"
          element={<DetailPage universities={universities} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
