import type { CSSProperties } from "react";
import styles from "./spacer.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const Spacer = ({
  size,
  axis,
}: {
  size: "sm" | "md" | "lg";
  axis?: "vertical" | "horizontal";
}) => {
  const width = axis === "vertical" ? "1px" : `var(--spaces-${size})`;
  const height = axis === "horizontal" ? "1px" : `var(--spaces-${size})`;
  return (
    <span
      className="spacer"
      style={
        {
          "--width": width,
          "--height": height,
        } as CSSProperties
      }
    />
  );
};

export default Spacer;
