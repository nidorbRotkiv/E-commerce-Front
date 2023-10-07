import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  mediumScreen,
  smallBorderRadius,
  defaultSortValue,
} from "@/lib/constants";
import { grey2 } from "@/lib/colors";

const StyledSorting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  label {
    font-size: 1.1rem;
  }
  select,
  input {
    font-size: 1rem;
    padding: 5px;
    border: 1px solid ${grey2};
    border-radius: ${smallBorderRadius}px;
    width: 100%;
    box-sizing: border-box;
  }
  @media screen and (min-width: ${mediumScreen}px) {
    flex-direction: row;
    align-items: center;
    label {
      width: auto;
    }
    select,
    input {
      width: auto;
    }
  }
`;

export default function Sorting({ onSortChange, onSearchChange, products }) {
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState(defaultSortValue);
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    onSortChange(products, event.target.value);
  };
  const handleSearchChange = (event) => {
    const search = event.target.value;
    setSearchValue(search);
    onSearchChange(products, search);
    // if search, sort by relevance
    search && setSortOption("relevance");
  };

  useEffect(() => {
    setSearchValue("");
    setSortOption(defaultSortValue);
  }, [products]);

  return (
    <StyledSorting>
      <label>
        Filtrar:{" "}
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="relevance">Relevancia</option>
          <option value="newest">Más nuevo</option>
          <option value="oldest">Más antiguo</option>
          <option value="lowest price">Precio más bajo</option>
          <option value="highest price">Precio más alto</option>
        </select>
      </label>
      <label>
        Buscar:{" "}
        <input
          id="search"
          value={searchValue}
          onChange={handleSearchChange}
          type="text"
          placeholder="Buscar"
        />
      </label>
    </StyledSorting>
  );
}
