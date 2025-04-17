import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "darkGrey"
    | "red";
  strong?: boolean;
  className?: string;
}

const Text = ({
  children,
  color = "default",
  strong = false,
  className = "",
}: TextProps) => {
  const getColorClass = () => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-gray-600";
      case "success":
        return "text-green-500";
      case "danger":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "darkGrey":
        return "text-gray-700";
      case "red":
        return "text-red-600";
      default:
        return "";
    }
  };

  return (
    <p
      className={`${getColorClass()} ${
        strong ? "font-semibold" : ""
      } ${className}`}
    >
      {children}
    </p>
  );
};

export default Text;
