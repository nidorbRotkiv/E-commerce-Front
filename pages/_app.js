import { createGlobalStyle } from "styled-components";
import { bodyBackgroundColor } from "@/lib/colors";
import { mediumScreen } from "@/lib/constants";
import { CartContextProvider } from "@/components/CartContext";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${bodyBackgroundColor};
    padding: 0;
    margin: 0;
    font-family: 'Martel Sans', sans-serif;
  }
  h1 {
    font-weight: 400;
    font-size: 1.7rem;
    @media screen and (min-width: ${mediumScreen}px) {
      font-size: 2rem;
    }
  }
  p {
    color: black;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
