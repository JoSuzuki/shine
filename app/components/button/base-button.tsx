import React from "react";

export default function BaseButton({
  className,
  children,
  onClick,
  tabIndex,
}: {
  className: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tabIndex?: number;
}) {
  return (
    <button className={className} onClick={onClick} tabIndex={tabIndex}>
      {children}
    </button>
  );
}
