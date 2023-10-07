import styled from "styled-components";
import PageContainer from "./PageContainer";
import Center from "./Center";
import WhiteBox from "./WhiteBox";

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px 0px 20px;
`;

export default function InfoPage({
  header = "Algo salió mal, intenta recargar la página.",
  description = "Si el problema persiste, contacta a soporte.",
}) {
  return (
    <PageContainer>
      <Center>
        <WhiteBox>
          <MessageWrapper>
            <h1>{header}</h1>
            <p>{description}</p>
          </MessageWrapper>
        </WhiteBox>
      </Center>
    </PageContainer>
  );
}
