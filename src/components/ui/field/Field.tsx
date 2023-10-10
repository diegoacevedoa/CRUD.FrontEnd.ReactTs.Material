import { useCallback, ChangeEvent, useMemo } from "react";
import "./Field.scss";

interface IField {
  id: string;
  name: string;
  type: string;
  label: string;
  value?: string;
  placeHolder: string;
  tabIndex: number;
  required?: boolean;
  disabled: boolean;
  className?: string;
  autoFocus: boolean;
  autoComplete: string;
  error?: string;
  isInvalid?: boolean;
  onChange: Function;
  onBlur?: Function;
}

const Field = ({
  id = "",
  name = "",
  type = "",
  label = "",
  value = "",
  placeHolder = "",
  tabIndex = 0,
  required = false,
  disabled = false,
  className = "",
  autoFocus = false,
  autoComplete = "off",
  error = "",
  isInvalid = false,
  onChange,
  onBlur,
}: IField) => {
  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange({ id, value: event.target.value, event });
  }, []);

  const handleOnBlur = useCallback(() => {
    if (onBlur != undefined) {
      onBlur();
    }
  }, []);

  const classList = useMemo(() => {
    return type !== "radio" && type !== "switch" && type !== "checkbox"
      ? `mb-field ${className}`
      : className;
  }, [className]);

  const classFieldControl = useMemo(() => {
    let setClass = "mb-field-control ";

    if (type === "password") {
      setClass += "mb-input-group-password";
    }

    if (isInvalid) {
      setClass += "is-invalid";
    }

    return setClass;
  }, [type, isInvalid]);

  return (
    <>
      <div className="mb-field">
        {label && (
          <label htmlFor={name} className="mb-form-label">
            {label}&nbsp;
            {required && <span className="mb-text-danger">*</span>}
          </label>
        )}
        <div className="mb-input-group">
          <input
            id={id}
            name={name}
            type={type}
            tabIndex={tabIndex}
            value={value ?? ""}
            placeholder={placeHolder}
            required={required}
            disabled={disabled}
            className={classFieldControl}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
          />
          {isInvalid && <div className="mb-invalid-feedback">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Field;
