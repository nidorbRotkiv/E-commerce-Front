import styled from "styled-components";
import { mediumBorderRadius, smallScreen } from "@/lib/constants";
import PageContainer from "@/components/PageContainer";
import Center from "@/components/Center";
import WhiteBox from "@/components/WhiteBox";
import Gallery from "@/components/Gallery";
import image2 from "../public/assets/image2.jpeg";
import image1 from "../public/assets/image1.jpeg";
import image6 from "../public/assets/image6.jpeg";

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  @media screen and (min-width: ${smallScreen}px) {
    font-size: 2.5rem;
  }
`;

const TextAlignCenter = styled.div`
  text-align: center;
`;

const GalleryWrapper = styled.div`
  margin-top: 25px;
`;

export default function About() {
  return (
    <PageContainer>
      <Center>
        <WhiteBox>
          <Title>¡Hola! Somos The Bestiehood</Title>
          <TextAlignCenter>
            <p>
              Somos Lucia y Adriana, dos hermanas Gen Z que vivimos en las redes
              sociales y amamos viajar para inspirarnos con los últimos trends
              en lifestyle y moda. Como amantes del shopping, nuestro goal es
              poner a tu alcance los productos que ya se volvieron nuestros
              besties. Seleccionamos muy cuidadosamente nuestro stock, y solo
              vendemos lo que nosotras mismas amamos. Todo lo que hacemos es con
              y por amor al arte de emprender.
            </p>
            <p>#WelcomeToTheBestiehood y gracias por apoyar este sueño 🤍 </p>
            <p>-Lu y Adri</p>
          </TextAlignCenter>
        </WhiteBox>
        <GalleryWrapper>
          <Gallery images={[image2, image6, image1]} radius={mediumBorderRadius} />
        </GalleryWrapper>
        <WhiteBox>
          <TextAlignCenter>
            <p>Llegamos a todo el perú. </p>
            <p>
              ¿no encontraste lo que querías? escríbenos al ig @thebestiehood.pe
              o @shopthebestiehood.pe y te lo conseguimos 🤍
            </p>
            <p>
              encuéntranos en Instagram y en Tiktok como @thebestiehood.pe y
              @shopthebestiehood.pe
            </p>
          </TextAlignCenter>
        </WhiteBox>
      </Center>
    </PageContainer>
  );
}
