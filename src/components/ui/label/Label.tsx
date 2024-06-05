import { useMemo } from "react";
import "./Label.scss";

interface ILabel {
  align: string;
  value: string;
  variant: string;
  type: number;
  icon?: any;
  hasMargin: boolean;
}

const Label = ({
  align = "left",
  value,
  variant = "title",
  type = 1,
  icon = null,
  hasMargin = false,
}: ILabel) => {
  const className = useMemo(() => {
    const defaultClass = "mb-label";
    return `${defaultClass} ${
      hasMargin ? "has-margin" : ""
    }   mb-label-${align}`;
  }, []);

  const text = useMemo(() => {
    const classes = `mb-label-text ${variant}-${type}`;
    if (variant === "title") {
      if (type === 1) {
        return <h1 className={classes}>{value}</h1>;
      }

      if (type === 2) {
        return <h2 className={classes}>{value}</h2>;
      }

      return <h3 className={classes}>{value}</h3>;
    }

    return <span className={classes}>{value}</span>;
  }, []);

  return (
    <span className={className}>
      {icon} {text}
    </span>
  );
};

export default Label;
