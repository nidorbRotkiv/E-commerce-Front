import styled from "styled-components";
import { mediumScreen, largeScreen } from "@/lib/constants";
import CategoryBox from "./CategoryBox";

const StyledCategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media screen and (min-width: ${mediumScreen}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: ${largeScreen}px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export default function CategoriesGrid({ categories }) {
  return (
    <StyledCategoriesGrid>
      {categories?.length > 0 &&
        categories.map((category) => (
          <div key={category._id}>
            <CategoryBox {...category} categories={categories} />
          </div>
        ))}
    </StyledCategoriesGrid>
  );
}
