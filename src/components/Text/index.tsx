import { Typography } from "antd";
import React from "react";

interface TextProps {
  color?: "darkGrey" | "red" | "black" | string; // เพิ่มตัวเลือก color แบบกำหนดเองได้
  strong?: boolean;
  size?: "small" | "medium" | "large"; // เพิ่มตัวเลือกขนาดข้อความ
  children: React.ReactNode;
  style?: React.CSSProperties; // รองรับการตั้งค่าด้วย style เพิ่มเติม
  className?: string; // รองรับการตั้งค่าด้วย className เพิ่มเติม
}

const colorMap: Record<string, string> = {
  darkGrey: "#666",
  red: "#e53935",
  black: "#000",
};

const Text: React.FC<TextProps> = ({
  color = "black",
  strong = false,
  size = "medium",
  children,
  style,
  className,
}) => {
  const sizeMap = {
    small: "12px",
    medium: "14px",
    large: "16px",
  };

  return (
    <Typography.Text
      className={className}
      style={{
        color: colorMap[color] || color, // ใช้ color ที่กำหนดหรือตามที่ user ส่งมา
        fontWeight: strong ? "bold" : undefined,
        fontSize: sizeMap[size], // ใช้ขนาดที่กำหนด
        ...style, // รองรับ style เพิ่มเติม
      }}
    >
      {children}
    </Typography.Text>
  );
};

export default Text;
