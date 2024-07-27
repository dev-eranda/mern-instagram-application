import React from "react";
import classNames from "classnames";
import "./Input.css";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value?: any;
  error?: string;
  register: any;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  error,
  register,
  className,
  onChange,
}) => {
  return (
    <div className={classNames("input-container", className)}>
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <input
        className={type === "file" ? "file-input" : "input-control"}
        {...register(name)}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        accept={type === "file" ? ".jpg, .jpeg, .png" : undefined}
        onChange={onChange}
      />
      <div className="input-error-container">
        {error && <span className="input-error">{error}</span>}
      </div>
    </div>
  );
};

export default Input;
