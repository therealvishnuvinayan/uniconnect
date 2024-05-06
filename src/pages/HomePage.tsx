import React, { useEffect, useState } from "react";
import { IUniversity, getUniversities } from "../models/universtityApis";

const HomePage: React.FC = () => {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [error, setError] = useState<string | null>(null);

  console.log('universities', universities)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUniversities();
        setUniversities(data);
      } catch (error) {
        setError("Unable to fetch universities");
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>List of Universities</h1>
      {error ? (
        <p>{error} </p>
      ) : (
        <ul>
          {universities.map((university) => (
            <li key={university.name}>
              <strong>
                {university.name} ({university.country})
              </strong>
              <a
                href={university.web_pages[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {university.web_pages[0]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
