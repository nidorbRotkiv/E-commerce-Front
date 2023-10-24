import UtilityFunctions from "../../lib/utilityFunctions";
import { compareTwoStrings as _compareTwoStrings } from "string-similarity";

const { handleSearchChange } = UtilityFunctions;

// Mock stringSimilarity to control similarity score for testing
jest.mock("string-similarity", () => ({
  compareTwoStrings: jest.fn(),
}));

describe("handleSearchChange", () => {
  beforeEach(() => {
    _compareTwoStrings.mockReset();
  });

  it("should handle different search term lengths", () => {
    // Mock similarity scores
    _compareTwoStrings.mockReturnValue(0.4);

    const products = [
      {
        title: "Product A",
        description: "Description A",
        properties: { color: "red" },
        variantValues: [{ value: "small" }],
      },
      {
        title: "Product B",
        description: "Description B",
        properties: { color: "blue" },
        variantValues: [{ value: "large" }],
      },
      {
        title: "Product C",
        description: "Description C",
        properties: { size: "medium" },
        variantValues: [{ value: "medium" }],
      },
    ];

    // Long search term
    const longSearchTerm = "product long search term";
    const resultLong = handleSearchChange(products, longSearchTerm);
    expect(resultLong.map((product) => product.title)).toEqual([
      "Product A",
      "Product B",
      "Product C",
    ]);

    // Medium search term
    const mediumSearchTerm = "product medium";
    const resultMedium = handleSearchChange(products, mediumSearchTerm);
    expect(resultMedium.map((product) => product.title)).toEqual([
      "Product A",
      "Product B",
      "Product C",
    ]);

    // Short search term
    const shortSearchTerm = "pr";
    const resultShort = handleSearchChange(products, shortSearchTerm);
    expect(resultShort.map((product) => product.title)).toEqual([
      "Product A",
      "Product B",
      "Product C",
    ]);
  });

  it("should handle empty input", () => {
    const products = [
      {
        title: "Product A",
        description: "Description A",
        properties: { color: "red" },
        variantValues: [{ value: "small" }],
      },
    ];

    const searchTerm = "";

    const result = handleSearchChange(products, searchTerm);

    // Empty search should return original products
    expect(result).toEqual(products);
  });

  // Add more test cases for edge cases and specific scenarios
});
