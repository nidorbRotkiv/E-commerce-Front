import UtilityFunctions from "../../lib/utilityFunctions";
import fakeProducts from "../fakeProducts";

test("testGetUniqueProducts", () => {
  const products = [fakeProducts[0], fakeProducts[0]];
  const received = UtilityFunctions.getUniqueProducts(products);
  const e = [fakeProducts[0]];
  expect(received).toStrictEqual(e);
});
