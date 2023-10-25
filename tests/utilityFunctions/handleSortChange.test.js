import UtilityFunctions from "../../lib/utilityFunctions";
import fakeProducts from "../fakeProducts";

const { handleSortChange } = UtilityFunctions;

const testCases = [
  ["highest price", (a, b) => b.selectedVariant.price - a.selectedVariant.price],
  ["lowest price", (a, b) => a.selectedVariant.price - b.selectedVariant.price],
  ["newest", (a, b) => new Date(b.createdAt) - new Date(a.createdAt)],
  ["oldest", (a, b) => new Date(a.createdAt) - new Date(b.createdAt)],
];

test.each(testCases)("testSortAfter%s", (sortCriteria, sortFn) => {
  const products = [...fakeProducts];
  expect(handleSortChange(products, sortCriteria)).toStrictEqual(products.slice().sort(sortFn));
});
