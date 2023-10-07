import styled from "styled-components";
import { grey1 } from "@/lib/colors";

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    color: #777;
    font-weight: 500;
    font-size: 0.8rem;
  }
  td {
    border-top: 1px solid ${grey1};
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
