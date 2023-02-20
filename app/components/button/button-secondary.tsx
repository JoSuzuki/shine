import React from "react";
import BaseButton from "./base-button";
import styles from "./button-secondary.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function ButtonSecondary({
  children,
  onClick,
  tabIndex,
  value,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tabIndex?: number;
  value?: string;
}) {
  return (
    <BaseButton
      className="button-secondary"
      onClick={onClick}
      tabIndex={tabIndex}
      value={value}
    >
      {children}
    </BaseButton>
  );
}
