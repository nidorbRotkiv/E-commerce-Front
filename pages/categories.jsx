import { Category } from "ecommerce-shared/models/Category";
import Center from "@/components/Center";
import CategoriesGrid from "@/components/CategoriesGrid";
import PageContainer from "@/components/PageContainer";

export default function Categories({ categories }) {
  return (
    <PageContainer>
      <Center>
        <h1>Categorías principales</h1>
        <CategoriesGrid categories={categories} />
      </Center>
    </PageContainer>
  );
}

export async function getServerSideProps() {
  let categories;
  try {
    categories = await Category.find({ parentCategory: null });
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return {
      notFound: true,
    };
  }
  return {
    props: { categories: JSON.parse(JSON.stringify(categories)) },
  };
}
