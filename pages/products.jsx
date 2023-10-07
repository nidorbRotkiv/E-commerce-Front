import { mongooseConnect } from "ecommerce-shared/mongoDB/mongoose";
import { Product } from "ecommerce-shared/models/Product";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import PageContainer from "@/components/PageContainer";

export default function ProductsPage({ products }) {
  return (
    <PageContainer>
      <Center>
        <h1>Todos los productos</h1>
        <ProductsGrid products={products} sorting={true} />
      </Center>
    </PageContainer>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  let products;
  try {
    products = await Product.find({});
  } catch (error) {
    console.error("Error fetching products: ", error);
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
