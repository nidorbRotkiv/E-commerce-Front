import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

export default function NewProducts({ products }) {
  return (
    <Center>
      <h1 id="new-arrivals">Los recién llegados</h1>
      <ProductsGrid products={products} sorting={false} />
    </Center>
  );
}
