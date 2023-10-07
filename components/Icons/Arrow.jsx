import styled from "styled-components";

const StyledArrow = styled.div`
  padding-top: 3px;
  margin-right: ${({ $marginRight }) => $marginRight};
`;

export default function Arrow({
  strokeWidth = 1.5,
  color = "currentColor",
  marginRight = "0px",
  direction = "up",
}) {
  const transformStyle = {
    transform:
      direction === "up"
        ? "rotate(180deg)"
        : direction === "right"
        ? "rotate(-90deg)"
        : direction === "down"
        ? "rotate(0deg)"
        : direction === "left"
        ? "rotate(90deg)"
        : "rotate(0deg)",
  };

  return (
    <StyledArrow $marginRight={marginRight}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth}
        stroke={color}
        style={transformStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
        />
      </svg>
    </StyledArrow>
  );
}
