import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IUniversity, getUniversities } from "../models/universtityApis";

export interface IHomePageProps {
  universities: IUniversity[];
}

const HomePage: React.FC<IHomePageProps> = ({ universities }) => {
  const [error, setError] = useState<string | null>(null);
  console.log("universities", universities);

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
              <Link to={`/details/${encodeURIComponent(university.name)}`}>
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
