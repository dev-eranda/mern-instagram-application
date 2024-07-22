import React from "react";
import "./Input.css";

interface InputProps {
  label: string;
  type: any;
  name: string;
  value?: any;
  error?: string;
  register: any;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  error,
  register,
}) => {
  return (
    <div className="input-container">
      <label className="input-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input-control"
        {...register(name)}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
      />
      <div className="input-error-container">
        {error && <span className="input-error">{error}</span>}
      </div>
    </div>
  );
};

export default Input;
