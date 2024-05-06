import React from 'react';
import { useParams } from 'react-router-dom';
import { IUniversity } from '../models/universtityApis';

interface IDetailPageProps {
  universities: IUniversity[];
}

const DetailPage: React.FC<IDetailPageProps> = ({ universities }) => {
  const { name } = useParams<{ name: string }>();
  const decodedName = name ? decodeURIComponent(name) : '';
  const university: IUniversity | undefined = universities.find((uni) => uni.name === decodedName);

  if (!university) {
    return <p>University not found</p>;
  }

  return (
    <div>
      <h1>{university.name}</h1>
      <p>Country: {university.country}</p>
      <p>State/Province: {university['state-province'] || 'N/A'}</p>
      <p>
        Website: <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">{university.web_pages[0]}</a>
      </p>
    </div>
  );
};

export default DetailPage;
