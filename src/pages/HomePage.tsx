import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IUniversity } from "../models/universtityApis";
import { searchUniversities, sortUniversities } from "../controllers/universitiesController";

export interface IHomePageProps {
  universities: IUniversity[];
  error?: string;
}

const HomePage: React.FC<IHomePageProps> = ({ universities, error }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedUniversities, setSortedUniversities] = useState<IUniversity[]>(universities);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    setSortedUniversities(universities);
  }, [universities]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    setSortOrder(order);
    setSortedUniversities(sortUniversities(universities, order as "asc" | "desc"));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    setSortedUniversities(searchUniversities(universities, keyword));
  };

  const handleDelete = (name: string, index: number) => {
    const tableRow = document.querySelector(`#university-row-${index}`);
    if (!tableRow) return;

    tableRow.classList.add("fade-out");
    setTimeout(() => {
      const updatedList = sortedUniversities.filter((uni) => uni.name !== name);
      setSortedUniversities(updatedList);
    }, 1000);
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <img src="uniconnect-logo.png" alt="Logo" className="logo" />
        <div className="controls">
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
        </div>
      </header>

      <main>
        <h1>List of Universities</h1>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <table className="universities-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Website</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {sortedUniversities.map((university, index) => (
                <tr id={`university-row-${index}`} key={university.name}>
                  <td>{university.name}</td>
                  <td>{university.country}</td>
                  <td>
                    <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">
                      {university.web_pages[0]}
                    </a>
                  </td>
                  <td>
                    <Link to={`/details/${encodeURIComponent(university.name)}`} className="view-button">
                      View
                    </Link>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(university.name, index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default HomePage;
