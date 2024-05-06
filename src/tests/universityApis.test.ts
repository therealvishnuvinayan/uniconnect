import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getUniversities, IUniversity } from "../models/universtityApis";

const mock = new MockAdapter(axios);

const mockUniversities: IUniversity[] = [
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

describe("getUniversities", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should return data from the API when the request is successful", async () => {
    mock
      .onGet(
        "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
      )
      .reply(200, mockUniversities);
    const data = await getUniversities();
    expect(data).toEqual(mockUniversities);
  });

  it("should return cached data when the API request fails", async () => {
    mock
      .onGet(
        "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
      )
      .networkError();
    localStorage.setItem("universities", JSON.stringify(mockUniversities));
    const data = await getUniversities();
    expect(data).toEqual(mockUniversities);
  });

  it("should return an empty array when both API and cache are unavailable", async () => {
    mock
      .onGet(
        "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
      )
      .networkError();
    localStorage.removeItem("universities");
    const data = await getUniversities();
    expect(data).toEqual([]);
  });
});
