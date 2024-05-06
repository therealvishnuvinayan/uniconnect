import React from "react";
import { useParams } from "react-router-dom";
import { IUniversity } from "../models/universtityApis";

interface IDetailPageProps {
  universities: IUniversity[];
}

const DetailPage: React.FC<IDetailPageProps> = ({ universities }) => {
  const { name } = useParams<{ name: string }>();
  const decodedName = name ? decodeURIComponent(name) : "";
  const university: IUniversity | undefined = universities.find(
    (uni) => uni.name === decodedName
  );

  if (!university) {
    return <p className="not-found-message">University not found</p>;
  }

  return (
    <div className="details-container">
      <div className="details-content">
        <h1 className="details-title">{university.name}</h1>
        <div className="details-info">
          <p>Country: {university.country}</p>
          <p>State/Province: {university["state-province"] || "N/A"}</p>
          <p>Alpha Two Code: {university.alpha_two_code}</p>
          <p>
            Website:{" "}
            <a
              href={university.web_pages[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="details-link"
            >
              {university.web_pages[0]}
            </a>
          </p>
          <p>Domains: {university.domains.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
