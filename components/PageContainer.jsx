import styled from "styled-components";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Children = styled.div`
  flex: 1;
`;

export default function PageContainer({ children }) {
  return (
    <Container>
      <Header />
      <Children>{children}</Children>
      <Footer />
    </Container>
  );
}
