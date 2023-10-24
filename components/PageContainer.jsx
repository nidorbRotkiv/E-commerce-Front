import { useEffect, useState } from "react";
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
  // Used to solve bug where the page would render without styles
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return;
  }

  return (
    <Container>
      <Header />
      <Children>{children}</Children>
      <Footer />
    </Container>
  );
}
