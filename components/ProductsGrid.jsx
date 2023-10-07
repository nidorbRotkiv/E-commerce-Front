import { useEffect, useState } from "react";
import styled from "styled-components";
import UtilityFunctions from "@/lib/utilityFunctions";
import {
  mediumScreen,
  largeScreen,
  extraSmallScreen,
  defaultSortValue,
} from "@/lib/constants";
import ProductBox from "./ProductBox";
import Sorting from "./Sorting";
import Button from "./Button";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  @media screen and (max-width: ${extraSmallScreen}px) {
    grid-template-columns: 1fr;
  }
  @media screen and (min-width: ${mediumScreen}px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: ${(mediumScreen + largeScreen) / 2}px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: ${largeScreen}px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export default function ProductsGrid({ products, sorting }) {
  const numberOfVisibleProducts = 20;
  const [sortedProducts, setSortedProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSortValue, setSelectedSortValue] = useState(defaultSortValue);
  const [visibleProducts, setVisibleProducts] = useState(
    numberOfVisibleProducts
  );

  function sort(allProducts, sortValue) {
    setSelectedSortValue(sortValue);
    if (searchTerm) {
      // sort the searched products
      setSortedProducts(UtilityFunctions.handleSortChange(sortedProducts, sortValue));
    } else {
      // sort all the products
      setSortedProducts(UtilityFunctions.handleSortChange(allProducts, sortValue));
    }
  }

  function search(sortedProducts, searchTerm) {
    setSearchTerm(searchTerm);
    setSortedProducts(UtilityFunctions.handleSearchChange(sortedProducts, searchTerm));
  }

  useEffect(() => {
    sort(sortedProducts, defaultSortValue);
    setSortedProducts(products);
    setSearchTerm("");
  }, [products]);

  useEffect(() => {
    !searchTerm && sort(sortedProducts, selectedSortValue);
  }, [searchTerm]);

  function handleShowMore() {
    setVisibleProducts(
      (prevVisibleProducts) => prevVisibleProducts + numberOfVisibleProducts
    );
  }

  return (
    <>
      {sorting && (
        <Sorting
          onSortChange={sort}
          onSearchChange={search}
          products={products}
        />
      )}
      {sortedProducts?.length === 0 && (
        <h1 style={{ textAlign: "center" }}>
          No hay productos que coincidan con tu búsqueda &#128532;
        </h1>
      )}
      <StyledProductsGrid>
        {sortedProducts?.length > 0 &&
          sortedProducts.slice(0, visibleProducts).map((product) => (
            <div key={product._id}>
              <ProductBox product={product} />
            </div>
          ))}
      </StyledProductsGrid>
      {visibleProducts < sortedProducts?.length && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button size="l" $primary onClick={handleShowMore}>
            Mostrar Más Productos
          </Button>
        </div>
      )}
    </>
  );
}
