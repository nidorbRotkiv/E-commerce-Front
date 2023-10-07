import Link from "next/link";
import styled from "styled-components";
import { backgroundColor, white } from "@/lib/colors";
import InstagramIcon from "./Icons/InstagramIcon";
import TikTokIcon from "./Icons/TikTokIcon";

const FooterWrapper = styled.div`
  background: ${backgroundColor};
  color: ${white};
  padding: 10px 0;
  margin-top: 30px;
  padding-top: 20px;
  text-align: center;
  img {
    max-width: 200px;
    margin-left: 20px;
  }
`;

const IconContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  max-width: 70px;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  color: ${white};
  text-decoration: none;
  font-size: 0.7rem;
`;

export default function Footer() {
  const socialMediaLinks = [
    {
      href: "https://www.instagram.com/thebestiehood.pe/",
      icon: <InstagramIcon />,
    },
    {
      href: "https://www.tiktok.com/@thebestiehood",
      icon: <TikTokIcon />,
    },
  ];

  return (
    <FooterWrapper>
      <StyledLink href={"/"}>
        <img src="/assets/logo.png" alt="logo" />
      </StyledLink>
      <IconContainer>
        {socialMediaLinks.map((linkInfo, index) => (
          <Link
            key={index}
            href={linkInfo.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkInfo.icon}
          </Link>
        ))}
      </IconContainer>
    </FooterWrapper>
  );
}
