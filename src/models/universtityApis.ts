import axios, { AxiosResponse } from "axios";

const apiUrl =
  "https://universities.hipolabs.com/search?country=United%20Arab%20Emirates";

export interface IUniversity {
  "state-province": string;
  domains: string[];
  web_pages: string[];
  name: string;
  alpha_two_code: string;
  country: string;
}

export async function getUniversities(): Promise<IUniversity[] | null> {
  const cachedUniversityData = localStorage.getItem("universities");
  if (cachedUniversityData) {
    try {
      const parsedData = JSON.parse(cachedUniversityData) as IUniversity[];
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        return parsedData;
      } else {
        console.warn("cached data is empty or invalid");
      }
    } catch (e) {
      console.error("Failed to parse cached data", e);
    }
  }
  try {
    const response: AxiosResponse<IUniversity[]> = await axios.get(apiUrl);
    const data = response.data;
    localStorage.setItem("universities", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Api request failed", error);
    return cachedUniversityData
      ? (JSON.parse(cachedUniversityData) as IUniversity[])
      : null;
  }
}
