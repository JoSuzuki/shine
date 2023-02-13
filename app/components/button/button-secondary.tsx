import React from "react";
import BaseButton from "./base-button";
import styles from "./button-secondary.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function ButtonSecondary({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <BaseButton className="button-secondary" onClick={onClick}>
      {children}
    </BaseButton>
  );
}
