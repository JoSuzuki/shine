import React from "react";

export default function BaseButton({
  className,
  children,
  onClick,
  tabIndex,
  value,
}: {
  className: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  tabIndex?: number;
  value?: string;
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      tabIndex={tabIndex}
      name="_action"
      value={value}
    >
      {children}
    </button>
  );
}
