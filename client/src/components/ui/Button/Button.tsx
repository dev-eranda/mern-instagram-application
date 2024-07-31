import React from "react";
import "./Button.css";

interface ButtonProps {
  disabled: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ disabled, children }) => {
  return (
    <button className="btn-primary" disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
