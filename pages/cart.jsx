import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { largeScreen, currency } from "@/lib/constants";
import UtilityFunctions from "@/lib/utilityFunctions";
import Center from "@/components/Center";
import Button from "@/components/Button";
import Table from "@/components/Table";
import WhiteBox from "@/components/WhiteBox";
import { CartContext } from "@/components/CartContext";
import PageContainer from "@/components/PageContainer";
import CartForm from "@/components/CartForm";
import TrashIcon from "@/components/Icons/TrashIcon";
import CartItemRow from "@/components/CartItemRow";
import InfoPage from "@/components/InfoPage";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: ${largeScreen}px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
`;

const Padding = styled.tr`
  td {
    padding: 10px 0;
  }
`;

export default function CartPage() {
  const { cartProducts, clearCart, updateProducts } = useContext(CartContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cartProducts.length <= 0) return;
    const sortedUniqueProducts = UtilityFunctions.getUniqueProducts(
      cartProducts
    ).sort(
      (a, b) =>
        a.title.localeCompare(b.title) ||
        a.selectedVariant.value.localeCompare(b.selectedVariant.value)
    );
    setUniqueProducts(sortedUniqueProducts);
    let newTotal = 0;
    for (const product of cartProducts) {
      newTotal += product.selectedVariant.price;
    }
    setTotal(newTotal);
  }, [cartProducts]);

  useEffect(() => {
    // update products on mount
    updateProducts();
    // check URL for success or error on mount
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    } else if (window?.location.href.includes("canceled")) {
      setError(true);
    }
  }, []);

  if (isSuccess) {
    return (
      <InfoPage
        header="Pedido exitoso"
        description="Gracias por su orden. Recibirás un email con tu pedido detalles en
            breve."
      />
    );
  }

  if (cartProducts.length <= 0) {
    return (
      <PageContainer>
        <Center>
          <WhiteBox>
            <h1>Carrito</h1>
            <p>No hay productos en el carrito.</p>
          </WhiteBox>
        </Center>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Center>
        {error && (
          <WhiteBox>
            <h1>Pedido fallido</h1>
            <p>
              Hubo un error al procesar su pedido. Por favor, inténtelo de nuevo
              más tarde.
            </p>
          </WhiteBox>
        )}
        <ColumnsWrapper>
          <WhiteBox>
            <h1>Carrito</h1>
            <Table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {uniqueProducts.map((product, index) => (
                  <CartItemRow key={index} product={product} />
                ))}
                <Padding>
                  <td>
                    <Button size="l" onClick={clearCart}>
                      <TrashIcon />
                    </Button>
                  </td>
                  <td></td>
                  <td>{currency + total}</td>
                </Padding>
              </tbody>
            </Table>
          </WhiteBox>
          <CartForm />
        </ColumnsWrapper>
      </Center>
    </PageContainer>
  );
}
