import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { backgroundColor, grey1, white } from "@/lib/colors";
import { mediumScreen } from "@/lib/constants";
import { CartContext } from "./CartContext";
import Center from "./Center";
import HamburgerIcon from "./Icons/HamburgerIcon";
import CloseIcon from "./Icons/CloseIcon";
import ShoppingCartIcon from "./Icons/ShoppingCartIcon";

const StyledHeader = styled.header`
  background: ${backgroundColor};
`;

const Logo = styled(Link)`
  position: relative;
  z-index: 3;
  margin-top: 5px;
  img {
    height: 50px;
    @media screen and (min-width: ${mediumScreen}px) {
      height: 55px;
    }
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
`;

const Nav = styled.nav`
  ${({ $smallScreenNavActive }) =>
    $smallScreenNavActive ? `display: block;` : `display: none;`}
  gap: 3vw;
  font-family: "Shadows Into Light", cursive;
  font-size: 1.5rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background: ${backgroundColor};
  z-index: 2;
  @media screen and (min-width: ${mediumScreen}px) {
    display: flex;
    position: static;
    padding: 15px;
    background: transparent;
  }
`;

const NavLink = styled(Link)`
  transition: all 0.3s ease;
  display: block;
  color: ${grey1};
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: ${mediumScreen}px) {
    padding: 0;
  }
  &:hover {
    color: ${white};
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  padding: 5px;
  width: 45px;
  height: 100%;
  border: none;
  color: ${white};
  cursor: pointer;
  position: relative;
  z-index: 3;
`;

const SmallScreenNav = styled.div`
  display: flex;
  gap: 5px;
  @media screen and (min-width: ${mediumScreen}px) {
    display: none;
  }
`;

const SmallSpan = styled.span`
  font-size: 1.2rem;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [smallScreenNavActive, setsmallScreenNavActive] = useState(false);
  useEffect(() => {
    if (smallScreenNavActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [smallScreenNavActive]);

  return (
    <StyledHeader>
      <Center>
        <HeaderWrapper>
          <Logo href={"/"}>
            <img src="/assets/logo.png" alt="logo" />
          </Logo>
          <Nav $smallScreenNavActive={smallScreenNavActive}>
            <NavLink href={"/"}>Inicio</NavLink>
            <NavLink href={"/products"}>Productos</NavLink>
            <NavLink href={"/categories"}>Categorías</NavLink>
            <NavLink href={"/about"}>Conócenos</NavLink>
            <NavLink href={"/cart"}>
              Carrito{" "}
              <SmallSpan>
                ({cartProducts.length < 100 ? cartProducts.length : "99+"})
              </SmallSpan>
            </NavLink>
          </Nav>
          <SmallScreenNav>
            <NavButton>
              <Link href={"/cart"} style={{ color: "white" }}>
                <ShoppingCartIcon withCartItemCount={true} />
              </Link>
            </NavButton>
            <NavButton onClick={() => setsmallScreenNavActive((prev) => !prev)}>
              {smallScreenNavActive ? <CloseIcon /> : <HamburgerIcon />}
            </NavButton>
          </SmallScreenNav>
        </HeaderWrapper>
      </Center>
    </StyledHeader>
  );
}
