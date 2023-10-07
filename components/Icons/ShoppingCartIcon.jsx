import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

export default function ShoppingCartIcon({
  withCartItemCount = false,
  strokeWidth = 1.5,
  color = "currentColor",
  marginRight = "0px",
}) {
  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={color}
      style={{ marginRight: marginRight }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
  const { cartCount } = useContext(CartContext);
  if (withCartItemCount) {
    const cartItemCount = cartCount();
    const left = cartItemCount > 99 ? 13 : cartItemCount > 9 ? 15 : 18;
    return (
      <div style={{ position: "relative", width: "38px", height: "45px" }}>
        {svg}
        {cartItemCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 9.5,
              left: left,
              fontSize: cartItemCount < 100 ? "11px" : "10px",
            }}
          >
            {cartItemCount < 100 ? cartItemCount : "99+"}
          </span>
        )}
      </div>
    );
  }
  return svg;
}
