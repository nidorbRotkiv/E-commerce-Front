import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { usePurchase } from "@/lib/hooks/usePurchase";
import {
  mediumScreen,
  currency,
  defaultImage,
  largeBorderRadius,
} from "@/lib/constants";
import UtilityFunctions from "@/lib/utilityFunctions";
import { backgroundColor, white, grey1 } from "@/lib/colors";
import { CartContext } from "./CartContext";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import ShoppingCartIcon from "./Icons/ShoppingCartIcon";
import CheckIcon from "./Icons/CheckIcon";
import Arrow from "./Icons/Arrow";

const Background = styled.article`
  background: ${backgroundColor};
  color: ${white};
  padding-bottom: 20px;
  cursor: default;
`;

const Description = styled.p`
  color: ${grey1};
  font-size: 0.9rem;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  div:nth-child(1) {
    order: 2;
    text-align: center;
  }
  img {
    max-width: 80%;
    display: block;
    margin: 0 auto;
  }
  @media screen and (min-width: ${mediumScreen}px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 350px;
    }
  }
`;

const Price = styled.div`
  font-size: 1.4rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  button,
  a {
    font-family: "Martel Sans", sans-serif;
    width: 135px;
    padding: 6px 0px 3px 0px;
    justify-content: center;
    border-radius: ${largeBorderRadius}px;
    svg {
      margin-bottom: 4px;
    }
  }
`;

export default function Featured({ product }) {
  const { title, description, selectedVariant, variantKey, _id } = product;
  const { purchase, handleAddToCartClick } = usePurchase();
  const { isAvailable } = useContext(CartContext);

  return (
    <Background>
      <Center>
        <ColumnWrapper>
          <div>
            <h1>{title}</h1>
            <Description>{description}</Description>
            <Price>{currency + selectedVariant.price}</Price>
            <ButtonWrapper>
              <ButtonLink
                href={UtilityFunctions.getProductUrl(product)}
                $outline
                $white
                style={{ fontSize: "0.9rem" }}
              >
                Leer más
              </ButtonLink>
              {isAvailable(product) && (
                <Button
                  $white
                  style={{ fontSize: "0.9rem" }}
                  onClick={(ev) => {
                    ev.preventDefault();
                    handleAddToCartClick(product);
                  }}
                >
                  {purchase ? (
                    <CheckIcon marginRight="5px" />
                  ) : (
                    <ShoppingCartIcon marginRight="5px" />
                  )}
                  Comprar
                </Button>
              )}
            </ButtonWrapper>
            <Link href={"#new-arrivals"} style={{ textDecoration: "none" }}>
              <Button style={{ color: "white", marginTop: "3vh" }}>
                <Arrow marginRight="5px" direction="down" />
                Los recién llegados
              </Button>
            </Link>
          </div>
          <Link href={UtilityFunctions.getProductUrl(product)}>
            <img src={selectedVariant.images[0] || defaultImage} alt={title} />
          </Link>
        </ColumnWrapper>
      </Center>
    </Background>
  );
}
