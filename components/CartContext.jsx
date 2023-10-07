import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (localStorage && localStorage.getItem("cart")) {
      setCartProducts(JSON.parse(localStorage.getItem("cart")));
    }
  }, [localStorage]);

  useEffect(() => {
    cartProducts?.length > 0
      ? localStorage?.setItem("cart", JSON.stringify(cartProducts))
      : localStorage?.removeItem("cart");
  }, [cartProducts, localStorage]);

  function addProductToCart(product) {
    setCartProducts((prev) => [...prev, product]);
  }

  function removeProductFromCart(product) {
    setCartProducts((prev) => {
      const pos = prev.findIndex(
        (p) =>
          p._id === product._id &&
          p.selectedVariant.value === product.selectedVariant.value
      );
      return pos !== -1 ? prev.filter((_, index) => index !== pos) : prev;
    });
  }

  function removeLineItem(product) {
    setCartProducts((prev) => {
      return prev.filter((p) => {
        return (
          p._id !== product._id ||
          p.selectedVariant.value !== product.selectedVariant.value
        );
      });
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  function cartCount() {
    return cartProducts.length;
  }

  function getQuantity(product) {
    return cartProducts.filter((p) => {
      return (
        p._id === product._id &&
        p.selectedVariant.value === product.selectedVariant.value
      );
    }).length;
  }

  function isAvailable(product) {
    return product.selectedVariant.stock - getQuantity(product) > 0;
  }

  async function updateProducts() {
    try {
      const res = await axios.get("/api/products");
      const updatedProducts = res.data;

      setCartProducts((prevCartProducts) => {
        return prevCartProducts.map((cartProduct) => {
          const updatedProduct = updatedProducts.find(
            (product) => product._id === cartProduct._id
          );
          if (!updatedProduct) return cartProduct;
          const updatedVariant = updatedProduct.variantValues.find(
            (variant) => variant.value === cartProduct.selectedVariant.value
          );
          return {
            ...cartProduct,
            selectedVariant: updatedVariant,
          };
        });
      });
    } catch (error) {
      console.error("Error updating products:", error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProductToCart,
        removeProductFromCart,
        clearCart,
        removeLineItem,
        cartCount,
        getQuantity,
        isAvailable,
        updateProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
