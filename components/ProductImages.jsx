import { useState, useEffect } from "react";
import styled from "styled-components";
import { mediumBorderRadius } from "@/lib/constants";

const SmallImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${mediumBorderRadius}px;
  &:hover {
    opacity: 0.5;
  }
`;

const FocusedImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: ${mediumBorderRadius}px;
  &:hover {
    opacity: 0.7;
  }
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
`;

const FocusedImageWrapper = styled.div`
  text-align: center;
  cursor: pointer;
`;

const ImageButton = styled.div`
  ${({ $active }) => !$active && `border-color:transparent; opacity: 0.6;`}
  height: 60px;
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

  useEffect(() => {
    setFocusedImage(images[0]);
  }, [images]);

  const handleImageClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {expanded && (
        <ExpandedOverlay onClick={handleImageClick}>
          <ExpandedImage src={focusedImage} alt="expanded product image" />
        </ExpandedOverlay>
      )}
      <FocusedImageWrapper onClick={handleImageClick}>
        <FocusedImage src={focusedImage} alt="focused product image" />
      </FocusedImageWrapper>
      <ImageButtons>
        {images?.map((image) => (
          <ImageButton
            $active={image === focusedImage}
            onClick={() => setFocusedImage(image)}
            key={image}
          >
            <SmallImage src={image} alt="product image" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
