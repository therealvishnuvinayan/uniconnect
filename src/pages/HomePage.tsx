import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IUniversity } from "../models/universtityApis";

export interface IHomePageProps {
  universities: IUniversity[];
}

const HomePage: React.FC<IHomePageProps> = ({ universities }) => {
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedUniversities, setSortedUniversities] =
    useState<IUniversity[]>(universities);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    setSortedUniversities(universities);
  }, [universities]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setSortOrder(order);

    const sorted = [...universities].sort((a, b) =>
      order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setSortedUniversities(sorted);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    const filtered = universities.filter(
      (university) =>
        university.name.toLowerCase().includes(keyword) ||
        university.country.toLowerCase().includes(keyword)
    );
    setSortedUniversities(filtered);
  };

  const handleDelete = (name: string) => {
    const filtered = sortedUniversities.filter(university => university.name !== name);
    setSortedUniversities(filtered);
  }

  return (
    <div>
      <h1>List of Universities</h1>
      <label htmlFor="sortOrder">Sort By:</label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option>Select..</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by name or country"
      />
      {error ? (
        <p>{error} </p>
      ) : (
        <ul>
          {sortedUniversities.map((university) => (
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
              <button onClick={() => handleDelete(university.name)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
