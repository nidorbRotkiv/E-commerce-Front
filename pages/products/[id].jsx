import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Product } from "ecommerce-shared/models/Product";
import {
  currency,
  largeScreen,
  mediumScreen,
  defaultImage,
} from "@/lib/constants";
import UtilityFunctions from "@/lib/utilityFunctions";
import { usePurchase } from "@/lib/hooks/usePurchase";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import ShoppingCartIcon from "@/components/Icons/ShoppingCartIcon";
import ProductProperties from "@/components/ProductProperties";
import PageContainer from "@/components/PageContainer";
import CheckIcon from "@/components/Icons/CheckIcon";
import Arrow from "@/components/Icons/Arrow";

const transition = "all 0.4s";

const ColWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  @media screen and (min-width: ${(mediumScreen + largeScreen) / 2}px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;
  @media screen and (min-width: ${mediumScreen}px) {
    flex-direction: row;
  }
`;

const Price = styled.span`
  font-size: 1.8rem;
  @media screen and (min-width: ${mediumScreen}px) {
    font-size: 2rem;
  }
`;

const ProductInfo = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.2rem;
  @media screen and (min-width: ${mediumScreen}px) {
    font-size: 3rem;
  }
`;

const ArrowIcon = styled.div`
  color: black;
  transform: ${({ $arrowUp }) =>
    $arrowUp ? "rotate(180deg)" : "rotate(0deg)"};
  transition: ${transition};
`;

const VariantWrapper = styled.div`
  margin-bottom: 10px;
  button {
    margin: 5px;
    width: 70px;
    justify-content: center;
  }
`;

const NotAvailable = styled.span`
  font-size: 1.8rem;
`;

export default function ProductPage({ initialProduct, selectedVariantValue }) {
  const [product, setProduct] = useState(initialProduct);
  const [showProperties, setShowProperties] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variantValues.find((v) => v.value === selectedVariantValue)
  );
  const { purchase, handleAddToCartClick } = usePurchase();
  const { isAvailable } = useContext(CartContext);

  useEffect(() => {
    if (product) {
      setProduct({ ...product, selectedVariant: selectedVariant });
      const newUrl = UtilityFunctions.getProductUrl(product);
      history.pushState(null, "", newUrl);
    }
  }, [selectedVariant]);

  const { title, description, variantKey, variantValues, properties } = product;

  const propertiesButtonText = showProperties
    ? "Menos Información"
    : "Haga clic para obtener más información";

  function displayVariants() {
    return (
      variantValues.length > 0 &&
      variantKey !== "" && (
        <VariantWrapper>
          {variantValues.map((v, index) => (
            <Button
              key={index}
              onClick={() => setSelectedVariant(v)}
              $primary
              $outline={selectedVariant.value !== v.value}
              style={{ width: "auto" }}
            >
              {v.value}
            </Button>
          ))}
        </VariantWrapper>
      )
    );
  }

  function displayProperties() {
    if (!properties) return null;
    return (
      <>
        <Button onClick={() => setShowProperties(!showProperties)}>
          <p>{propertiesButtonText}</p>&nbsp;
          <ArrowIcon $arrowUp={showProperties}>
            <Arrow direction="down" />
          </ArrowIcon>
        </Button>
        <ProductProperties
          properties={properties}
          $show={showProperties}
          transition={transition}
        />
      </>
    );
  }

  function displayImages() {
    return (
      <div>
        <ProductImages
          images={
            selectedVariant.images.length > 0
              ? selectedVariant.images
              : [defaultImage]
          }
        />
      </div>
    );
  }

  return (
    <PageContainer>
      <Center>
        <WhiteBox>
          <ColWrapper>
            {displayImages()}
            <ProductInfo>
              <Title>{title}</Title>
              <p>{description}</p>
              {displayVariants()}
              {displayProperties()}
              {isAvailable(product) ? (
                <PriceRow>
                  <Price>{currency + selectedVariant.price}</Price>
                  <Button
                    size="l"
                    $primary
                    onClick={() => {
                      handleAddToCartClick(product);
                    }}
                  >
                    {purchase ? (
                      <CheckIcon marginRight="5px" />
                    ) : (
                      <ShoppingCartIcon marginRight="5px" />
                    )}
                    Añadir a el carrito
                  </Button>
                </PriceRow>
              ) : (
                <NotAvailable>{UtilityFunctions.displayOutOfStock(selectedVariant.stock)} &#128532;</NotAvailable>
              )}
            </ProductInfo>
          </ColWrapper>
        </WhiteBox>
      </Center>
    </PageContainer>
  );
}

export async function getServerSideProps(context) {
  const url = context.query.id;
  const selectedVariantValue = url.substring(
    url.indexOf("=") + 1,
    url.indexOf("_", url.indexOf("=") + 1)
  );

  const productId = url.split("=")[2];
  let product;
  try {
    product = await Product.findById(productId);
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialProduct: JSON.parse(JSON.stringify(product)),
      selectedVariantValue,
    },
  };
}
