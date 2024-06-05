import { useMemo } from "react";

import "./Button.scss";
import { Button as MuiButton } from "@mui/material";

type TVariant = "text" | "contained" | "outlined";

type TColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

type TSize = "small" | "medium" | "large";

interface IButton {
  form?: string;
  type: any;
  variant?: TVariant;
  color?: TColor;
  size?: TSize;
  hasMargin?: boolean;
  className?: string;
  disabled?: boolean;
  tabIndex?: number;
  icon?: any;
  onClick?: any;
  children: any;
}

const Button = ({
  form = "",
  type = "",
  variant = "contained",
  color = "primary",
  size = "medium",
  hasMargin = false,
  className = "",
  disabled = false,
  tabIndex = 0,
  icon = null,
  onClick,
  children,
}: IButton) => {
  const classList = useMemo(() => {
    const classes = `mb-btn ${className} ${
      hasMargin ? "has-margin" : ""
    } mb-btn-${variant}`;
    return classes;
  }, [className, hasMargin, variant]);

  const text = useMemo(() => {
    return children ? (
      <span className={icon ? "mb-btn-text" : ""}>{children}</span>
    ) : null;
  }, []);

  return (
    <MuiButton
      form={form}
      type={type}
      variant={variant}
      color={color}
      size={size}
      className={classList}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={onClick}
      startIcon={icon}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
