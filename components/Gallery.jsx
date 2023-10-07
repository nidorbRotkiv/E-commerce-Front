import Image from "next/image";
import styled from "styled-components";
import { mediumScreen, largeScreen } from "@/lib/constants";
import { defaultImage } from "@/lib/constants";

const ImageWrapper = styled.div`
  position: relative;
  height: 25vh;
  max-height: 350px;
  width: 100%;
`;

const ImageContainer = styled(ImageWrapper)`
  ${({ $smallScreen, $mediumScreen, $largeScreen }) => `
    @media screen and (max-width: ${mediumScreen}px) {
      display: ${$smallScreen ? "flex" : "none"};
    }

    @media screen and (min-width: ${mediumScreen}px) and (max-width: ${largeScreen}px) {
      display: ${$mediumScreen ? "flex" : "none"};
    }

    @media screen and (min-width: ${largeScreen}px) {
      display: ${$largeScreen ? "flex" : "none"};
    }
  `}
`;

export default function Gallery({ images, radius = "0" }) {
  const leftImageRadius = `${radius}px 0 0 ${radius}px`;
  const rightImageRadius = `0 ${radius}px ${radius}px 0`;

  function renderImages(numberOfImages) {
    function calculateRadius(index, numberOfImages) {
      if (numberOfImages === 1) {
        return radius;
      } else if (index === 0) {
        return leftImageRadius;
      } else if (index === numberOfImages - 1) {
        return rightImageRadius;
      } else {
        return "0";
      }
    }

    return images.slice(0, numberOfImages).map((image, index) => (
      <ImageWrapper key={index}>
        <Image
          src={image}
          alt={`Image`}
          fill
          sizes="100%"
          priority
          style={{
            objectFit: "cover",
            borderRadius: calculateRadius(index, numberOfImages),
          }}
        />
      </ImageWrapper>
    ));
  }

  images.length === 0 && images.push(defaultImage);

  return (
    <section>
      <ImageContainer $smallScreen>{renderImages(1)}</ImageContainer>
      <ImageContainer $mediumScreen>
        {renderImages(Math.ceil(images.length / 2))}
      </ImageContainer>
      <ImageContainer $largeScreen>
        {renderImages(images.length)}
      </ImageContainer>
    </section>
  );
}
