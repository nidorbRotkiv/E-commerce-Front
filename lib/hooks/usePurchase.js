import { useState, useContext } from "react";
import { CartContext } from "@/components/CartContext";

// used to keep track of the purchase state and add the product to the cart.

export function usePurchase() {
  const purchaseStateTimeout = 500;
  const [purchase, setPurchase] = useState(false);
  const { addProductToCart } = useContext(CartContext);

  const handleAddToCartClick = (product) => {
    addProductToCart(product);
    setPurchase(true);
    setTimeout(() => {
      setPurchase(false);
    }, purchaseStateTimeout);
  };

  return {
    purchase,
    handleAddToCartClick,
  };
}
