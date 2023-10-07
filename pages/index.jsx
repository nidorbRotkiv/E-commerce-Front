import { mongooseConnect } from "ecommerce-shared/mongoDB/mongoose";
import { Product } from "ecommerce-shared/models/Product";
import Featured from "../components/Featured";
import NewProducts from "@/components/NewProducts";
import Gallery from "@/components/Gallery";
import PageContainer from "@/components/PageContainer";
import image3 from "../public/assets/image3.jpeg";
import image4 from "../public/assets/image4.jpeg";
import image5 from "../public/assets/image5.jpeg";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <PageContainer>
      <Featured product={featuredProduct} />
      <Gallery images={[image4, image3, image5]} />
      <NewProducts products={newProducts} />
    </PageContainer>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  let featuredProducts;
  let newProducts;
  try {
    featuredProducts = await Product.find({ featured: true });
    newProducts = await Product.find({
      "selectedVariant.stock": { $gt: 0 },
    })
      .sort({ createdAt: -1 })
      .limit(10);
  } catch (error) {
    console.error("Error fetching products: ", error);
    return {
      notFound: true,
    };
  }
  const randomIndex = Math.floor(Math.random() * featuredProducts.length);
  const featuredProduct = featuredProducts[randomIndex];
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
