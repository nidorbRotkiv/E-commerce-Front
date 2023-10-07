export default function InstagramIcon({
  strokeWidth = 8,
  color = "#fff",
}) {
  return (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect fill="none" height="256" width="256" />
      <circle
        cx="128"
        cy="128"
        fill="none"
        r="40"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <rect
        fill="none"
        height="184"
        rx="48"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        width="184"
        x="36"
        y="36"
      />
      <circle cx="180" cy="763" r="8" />
    </svg>
  );
}
