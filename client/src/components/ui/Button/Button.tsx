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

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ disabled, icon }) => {
  return (
    <button className="btn-icon" disabled={disabled}>
      <span className="icon">{icon}</span>
    </button>
  );
};

export default Button;
export { IconButton };
