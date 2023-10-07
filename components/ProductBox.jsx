import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { white } from "@/lib/colors";
import {
  largeScreen,
  mediumScreen,
  smallScreen,
  currency,
  defaultImage,
  mediumBorderRadius,
} from "@/lib/constants";
import { usePurchase } from "@/lib/hooks/usePurchase";
import UtilityFunctions from "@/lib/utilityFunctions";
import { CartContext } from "./CartContext";
import Button from "./Button";
import ShoppingCartIcon from "./Icons/ShoppingCartIcon";
import CheckIcon from "@/components/Icons/CheckIcon";

const ProductWrapper = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: ${white};
  border-radius: ${mediumBorderRadius}px;
  &:hover {
    scale: 1.01;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    img {
      transition: transform 1s ease;
      transform: scale(1.1);
    }
  }
`;

const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

const Title = styled(Link)`
  text-align: center;
  font-size: 1rem;
  @media screen and (min-width: ${largeScreen}px) {
    font-size: 1.1rem;
  }
  color: inherit;
  text-decoration: none;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 5px;
`;

const Price = styled.div`
  font-size: 1rem;
`;

const ImageWrapper = styled(Link)`
  position: relative;
  height: 170px;
  @media screen and (min-width: ${mediumScreen}px) {
    height: 250px;
  }
  width: 100%;
  overflow: hidden;
  img {
    border-radius: ${mediumBorderRadius}px ${mediumBorderRadius}px 0 0;
  }
`;

export default function ProductBox({ product }) {
  const largeScreenMaxTitleLength = 38;
  const mediumScreenMaxTitleLength = 33;
  const smallScreenMaxTitleLength = 28;
  const [maxTitleLength, setMaxTitleLength] = useState(0);
  const { purchase, handleAddToCartClick } = usePurchase();
  const [windowWidth, setWindowWidth] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const { title, selectedVariant } = product;
  const { isAvailable } = useContext(CartContext);

  // handles window resize
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // + "x" is hardcoded to behave the same as media query
    if (windowWidth > mediumScreen + 433) {
      setMaxTitleLength(largeScreenMaxTitleLength);
    } else if (windowWidth > smallScreen + 100) {
      setMaxTitleLength(mediumScreenMaxTitleLength);
    } else {
      setMaxTitleLength(smallScreenMaxTitleLength);
    }
  }, [windowWidth]);

  const url = UtilityFunctions.getProductUrl(product);

  function getButtonContent() {
    if (isAvailable(product) && !purchase) {
      // available
      return (
        <>
          <ShoppingCartIcon
            marginRight={windowWidth > mediumScreen ? "5px" : "0px"}
          />
          {windowWidth > mediumScreen ? "Comprar" : ""}
        </>
      );
    } else if (isAvailable(product) && purchase) {
      // purchased
      return <CheckIcon />;
    } else {
      // out of stock
      return windowWidth > mediumScreen
        ? UtilityFunctions.displayOutOfStock(selectedVariant.stock)
        : "X";
    }
  }

  return (
    <ProductWrapper>
      <ImageWrapper
        href={url}
        onMouseOver={() => setImageIndex(1)}
        onMouseOut={() => setImageIndex(0)}
      >
        <Image
          src={
            selectedVariant.images[imageIndex] ||
            selectedVariant.images[0] ||
            defaultImage
          }
          alt={title}
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
          }}
        />
      </ImageWrapper>
      <InfoWrapper>
        <Title href={url}>
          {title.length > maxTitleLength
            ? `${title.slice(0, maxTitleLength)}...`
            : title}
        </Title>
        <PriceRow>
          <Price>{currency + selectedVariant.price}</Price>
          <Button
            $primary
            $outline
            disabled={!isAvailable(product)}
            onClick={() => {
              handleAddToCartClick(product);
            }}
          >
            {getButtonContent()}
          </Button>
        </PriceRow>
      </InfoWrapper>
    </ProductWrapper>
  );
}
