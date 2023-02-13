import React from "react";
import BaseButton from "./base-button";
import styles from "./button-primary.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function ButtonPrimary({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <BaseButton className="button-primary" onClick={onClick}>
      {children}
    </BaseButton>
  );
}
