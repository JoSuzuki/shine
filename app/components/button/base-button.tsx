import React from "react";

export default function BaseButton({
  className,
  children,
  onClick,
}: {
  className: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
