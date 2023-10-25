import React from "react";

interface Props {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  formAction?: string;
}

const CompButton: React.FC<Props> = ({
  type = "button",
  children,
  onClick,
  fullWidth = false,
  formAction,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      formAction={formAction}
      className={`border-2 duration-200 border-black rounded-md px-3 py-1 hover:bg-black hover:text-white ${
        fullWidth && "w-full"
      }`}
    >
      {children}
    </button>
  );
};

export default CompButton;
