import React from "react";
import { Button } from "antd";

interface CustomButtonProps {
  text: string;
  type?: "primary" | "default" | "dashed" | "link" | "text";
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  type = "default",
  danger = false,
  disabled = false,
  loading = false,
  onClick,
}) => {
  return (
    <Button
      type={type}
      danger={danger}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
