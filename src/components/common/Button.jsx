import React from "react";

const VARIANTS = {
  primary: "bg-primary text-heading hover:bg-secondary",
  secondary: "bg-surface text-heading border border-surfaceBorder hover:bg-surfaceBorder",
  danger: "bg-red-500 text-heading hover:bg-red-600",
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
