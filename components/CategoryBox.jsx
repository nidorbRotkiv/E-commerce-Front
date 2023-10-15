import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { white, bodyBackgroundColor } from "@/lib/colors";
import { mediumBorderRadius, mediumScreen } from "@/lib/constants";
import defaultImage from "@/public/assets/image5.jpeg";
import UtilityFunctions from "@/lib/utilityFunctions";

const CategoryWrapper = styled.article`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to right, ${white}, ${bodyBackgroundColor});
  border-radius: ${mediumBorderRadius}px;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 50px rgba(255, 255, 255, 0.7);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 25vh;
  max-height: 250px;
  min-height: 150px;
  margin: 20px auto;
  width: 90%;
  img {
    border-radius: ${mediumBorderRadius}px;
  }
`;

const Title = styled.h1`
  font-size: 1.1rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
  @media screen and (min-width: ${mediumScreen}px) {
    font-size: 1.3rem;
  }
`;

const CategoryInfoBox = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  all: unset;
  cursor: pointer;
`;

export default function CategoryBox({ name, _id, image }) {
  const url = UtilityFunctions.getCategoryUrl(_id, name);
  return (
    <StyledLink href={url}>
      <CategoryWrapper>
        <ImageWrapper>
          <Image
            src={image || defaultImage}
            alt={name}
            fill
            sizes="100%"
            priority
            style={{
              objectFit: "cover",
            }}
          />
        </ImageWrapper>
        <CategoryInfoBox>
          <Title>{name}</Title>
        </CategoryInfoBox>
      </CategoryWrapper>
    </StyledLink>
  );
}
