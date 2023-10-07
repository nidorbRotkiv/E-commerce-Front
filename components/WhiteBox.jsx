import styled from "styled-components";
import { white } from "@/lib/colors";
import { smallScreen, mediumBorderRadius } from "@/lib/constants";

const WhiteBox = styled.div`
  background-color: ${white};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: ${mediumBorderRadius}px;
  padding: 30px;
  @media screen and (max-width: ${smallScreen}px) {
    padding: 15px;
  }
  margin-top: 25px;
`;

export default WhiteBox;
