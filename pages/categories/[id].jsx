import styled from "styled-components";
import { mongooseConnect } from "ecommerce-shared/mongoDB/mongoose";
import { Category } from "ecommerce-shared/models/Category";
import { Product } from "ecommerce-shared/models/Product";
import UtilityFunctions from "@/lib/utilityFunctions";
import CategoriesGrid from "@/components/CategoriesGrid";
import ProductsGrid from "@/components/ProductsGrid";
import PageContainer from "@/components/PageContainer";
import Center from "@/components/Center";
import ButtonLink from "@/components/ButtonLink";
import Arrow from "@/components/Icons/Arrow";

const BackButtonWrapper = styled.div`
  margin-top: 15px;
`;

export default function CategoryPage({ category, childCategories, products }) {
  function getParentUrl() {
    if (category.parentCategory) {
      return UtilityFunctions.getCategoryUrl(
        category.parentCategory._id,
        category.parentCategory.name
      );
    }
    return "/categories";
  }

  return (
    <PageContainer>
      <Center>
        <BackButtonWrapper>
          <ButtonLink $primary href={getParentUrl()}>
            <Arrow strokeWidth={2} marginRight="5px" direction="left" />
            To all {category.parentCategory?.name || "Categories"}
          </ButtonLink>
        </BackButtonWrapper>
        {childCategories.length > 0 && (
          <>
            <h1>Más categorías</h1>
            <CategoriesGrid categories={childCategories} />
          </>
        )}
        {products.length > 0 && (
          <>
            <h1>{category.name}</h1>
            <ProductsGrid products={products} sorting={true} />
          </>
        )}
      </Center>
    </PageContainer>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const id = context.query.id.split("=")[1];
  let category;
  let products;
  let childCategories;
  try {
    category = await Category.findById(id).populate("parentCategory");
    products = await Product.find({ category: id });
    childCategories = await Category.find({ parentCategory: id });
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      childCategories: JSON.parse(JSON.stringify(childCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
