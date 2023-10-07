import styled from "styled-components";
import { primary } from "@/lib/colors";
import PropagateLoader from "react-spinners/PropagateLoader";

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin: ${props => (props.$small ? "15px 0" : "25vh 0")};
`;

export default function Loader({ $small }) {
  return (
    <Center $small={$small}>
      <PropagateLoader color={primary} size={$small ? 15 : 20} speedMultiplier={2} />
    </Center>
  );
}
