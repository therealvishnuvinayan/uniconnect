import { IUniversity } from "../models/universtityApis";

// Sort the list based on the provided order
export const sortUniversities = (universities: IUniversity[], order: "asc" | "desc") => {
  return [...universities].sort((a, b) =>
    order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
};

// Filter the list based on the search term
export const searchUniversities = (universities: IUniversity[], keyword: string) => {
  const lowerKeyword = keyword.toLowerCase();
  return universities.filter(
    (university) =>
      university.name.toLowerCase().includes(lowerKeyword) ||
      university.country.toLowerCase().includes(lowerKeyword)
  );
};

// Delete an item by filtering out the one that matches the given name
export const deleteUniversity = (universities: IUniversity[], name: string) => {
  return universities.filter((university) => university.name !== name);
};
