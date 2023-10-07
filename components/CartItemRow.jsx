import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { mediumScreen, currency, defaultImage } from "@/lib/constants";
import UtilityFunctions from "@/lib/utilityFunctions";
import { CartContext } from "@/components/CartContext";
import Button from "@/components/Button";
import TrashIcon from "@/components/Icons/TrashIcon";

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductLink = styled(Link)`
  all: unset;
  cursor: pointer;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100%;
  padding: 3px;
  margin-bottom: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  img {
    border-radius: 50%;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.span`
  font-size: 0.85rem;
  margin-top: 3px;
  color: #666;
`;

const QuantityButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (min-width: ${mediumScreen}px) {
    flex-direction: row;
  }
  svg {
    margin: 0px;
  }
`;

const QuantityLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;

export default function CartItemRow({ product }) {
  const {
    addProductToCart,
    removeProductFromCart,
    removeLineItem,
    getQuantity,
    isAvailable,
  } = useContext(CartContext);
  const { selectedVariant, title } = product;

  const [smallScreen, setSmallScreen] = useState(true);

  useEffect(() => {
    // handle screen size
    window.addEventListener("resize", updateSmallScreen);
    updateSmallScreen();
    return () => {
      window.removeEventListener("resize", updateSmallScreen);
    };
  }, []);

  const updateSmallScreen = () => {
    if (window.innerWidth > mediumScreen) {
      setSmallScreen(false);
    } else {
      setSmallScreen(true);
    }
  };

  function addProductButton() {
    return (
      <Button
        size="l"
        onClick={() => {
          if (isAvailable(product)) {
            addProductToCart(product);
          }
        }}
      >
        {isAvailable(product) ? "+" : ""}
      </Button>
    );
  }

  function removeProductButton() {
    return (
      <Button
        size="l"
        onClick={() => {
          removeProductFromCart(product);
        }}
      >
        -
      </Button>
    );
  }

  return (
    <tr>
      <ProductInfoCell>
        <ProductLink href={UtilityFunctions.getProductUrl(product)}>
          <ProductImageBox>
            <ImageWrapper>
              <Image
                src={selectedVariant.images[0] || defaultImage}
                alt={title}
                fill
                sizes="100%"
                priority
                style={{
                  objectFit: "cover",
                }}
              />
            </ImageWrapper>
          </ProductImageBox>
          <Column>
            <span>{UtilityFunctions.getFullTitle(title, selectedVariant)}</span>
            <Price>{currency + selectedVariant.price}</Price>
          </Column>
        </ProductLink>
      </ProductInfoCell>
      <td>
        <QuantityButtonWrapper>
          {smallScreen ? addProductButton() : removeProductButton()}
          <QuantityLabel>{getQuantity(product)}</QuantityLabel>
          {smallScreen ? removeProductButton() : addProductButton()}
          <Button
            size="l"
            onClick={() => {
              removeLineItem(product);
            }}
          >
            <TrashIcon />
          </Button>
        </QuantityButtonWrapper>
      </td>
      <td>{currency + getQuantity(product) * selectedVariant.price}</td>
    </tr>
  );
}
