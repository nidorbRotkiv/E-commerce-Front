import UtilityFunctions from "../../lib/utilityFunctions";

test("testGetUniqueProducts", () => {
  const product = {
    title: "name",
    description: "description",
    category: null,
    properties: null,
    featured: false,
    variantKey: "",
    variantValues: [],
    selectedVariant: { value: "test" },
  };
  const products = [product, product];
  const received = UtilityFunctions.getUniqueProducts(products);
  const e = [products[0]];
  expect(received).toStrictEqual(e);
});
