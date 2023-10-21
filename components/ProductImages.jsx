import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  mediumBorderRadius,
  mediumScreen,
  largeScreen,
  smallScreen,
} from "@/lib/constants";
import Image from "next/image";
import Loader from "@/components/Loader";

const ImageLoading = styled.div`
  display: ${({ $loaded }) => ($loaded ? "block" : "none")};
`;

const SmallImage = styled(Image)`
  max-height: 100%;
  border-radius: ${mediumBorderRadius}px;
  &:hover {
    opacity: 0.5;
  }
`;

const FocusedImage = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 350px;
  &:hover {
    opacity: 0.7;
  }
  img {
    border-radius: ${mediumBorderRadius}px;
  }
  @media screen and (min-width: ${mediumScreen}px) {
    width: 50%;
  }
  @media screen and (min-width: ${(mediumScreen + largeScreen) / 2}px) {
    width: 70%;
  }
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
`;

const FocusedImageWrapper = styled.div`
  cursor: pointer;
`;

const ImageButton = styled.div`
  ${({ $active }) => !$active && `border-color:transparent; opacity: 0.6;`}
  height: 60px;
  width: 60px;
  cursor: pointer;
`;

const ExpandedOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const ExpandedImage = styled.img`
  max-height: 90vh;
  max-width: 90vw;
`;

export default function ProductImages({ images }) {
  const [focusedImage, setFocusedImage] = useState(images[0]);
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timeUntilLoad = 3000;

  useEffect(() => {
    setLoaded(false);
  }, [focusedImage]);

  useEffect(() => {
    // solves a bug in safari where the first image doesn't load properly.
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, timeUntilLoad);
    return () => clearTimeout(timeout);
  }, [images]);

  useEffect(() => {
    setFocusedImage(images[0]);
  }, [images]);

  const handleImageClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {!loaded && <Loader />}
      <ImageLoading $loaded={loaded}>
        {expanded && (
          <ExpandedOverlay onClick={handleImageClick}>
            <ExpandedImage src={focusedImage} alt="expanded product image" />
          </ExpandedOverlay>
        )}
        <FocusedImageWrapper onClick={handleImageClick}>
          <FocusedImage>
            <Image
              src={focusedImage}
              alt="product image"
              fill
              sizes="100%"
              priority
              style={{
                objectFit: "cover",
              }}
              onLoad={() => {
                setLoaded(true);
              }}
            />
          </FocusedImage>
        </FocusedImageWrapper>
        <ImageButtons>
          {images?.map((image) => (
            <ImageButton
              $active={image === focusedImage}
              onClick={() => setFocusedImage(image)}
              key={image}
            >
              <SmallImage
                src={image}
                alt="product image"
                layout="responsive"
                width={100}
                height={100}
                priority
              />
            </ImageButton>
          ))}
        </ImageButtons>
      </ImageLoading>
    </>
  );
}
