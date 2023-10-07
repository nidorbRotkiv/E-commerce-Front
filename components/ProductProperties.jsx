import styled from "styled-components";
import UtilityFunctions from "lib/utilityFunctions";

const CenterProperties = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  text-align: left;
  opacity: ${({ $show }) => ($show ? "1" : "0")};
  transform: ${({ $show }) => ($show ? "translateY(0)" : "translateY(-10px)")};
  max-height: ${({ $show }) => ($show ? "100%" : "0")};
  transition: ${({ $transition }) => $transition};
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  padding: 2px 0 2px 0;

  .key {
    font-weight: bold;
  }
`;

export default function ProductProperties({ properties, $show, transition }) {
  if (!properties) {
    return null;
  }

  return (
    <CenterProperties $show={$show} $transition={transition}>
      <Ul>
        {Object.entries(properties).map(([key, value]) => (
          <Li key={key}>
            <span className="key">{UtilityFunctions.capitalize(key)}:</span> {UtilityFunctions.capitalize(value)}
          </Li>
        ))}
      </Ul>
    </CenterProperties>
  );
}
