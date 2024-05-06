import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../pages/HomePage";

const universities = [
  {
    "state-province": "California",
    domains: ["caltech.edu"],
    web_pages: ["http://www.caltech.edu/"],
    name: "California Institute of Technology",
    alpha_two_code: "US",
    country: "United States",
  },
  {
    "state-province": "New York",
    domains: ["nyu.edu"],
    web_pages: ["http://www.nyu.edu/"],
    name: "New York University",
    alpha_two_code: "US",
    country: "United States",
  },
];

describe("HomePage", () => {
  it("should render universities passed as props", () => {
    render(<HomePage universities={universities} error="" />);
    expect(
      screen.getByText("California Institute of Technology")
    ).toBeInTheDocument();
    expect(screen.getByText("New York University")).toBeInTheDocument();
  });

  it("should filter universities based on search input", () => {
    render(<HomePage universities={universities} error="" />);
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: "California" },
    });

    expect(
      screen.getByText("California Institute of Technology")
    ).toBeInTheDocument();
    expect(screen.queryByText("New York University")).toBeNull();
  });

  it("should display an error message if error prop is set", () => {
    render(<HomePage universities={[]} error="Unable to fetch universities" />);

    expect(
      screen.getByText("Unable to fetch universities")
    ).toBeInTheDocument();
  });
});
