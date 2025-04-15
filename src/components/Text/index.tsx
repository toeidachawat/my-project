import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Typography } from "antd";
import React, { CSSProperties } from "react";
import theme from "../../theme";

type TextType = {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  title1?: boolean;
  title2?: boolean;
  body1?: boolean;
  body2?: boolean;
  body3?: boolean;
  bold?: boolean;
  semiBold?: boolean;
  medium?: boolean;
  light?: boolean;
  isButton?: boolean;
  left?: boolean;
  right?: boolean;
  center?: boolean;
  fontSize?: number;
  fontFamily?: string;
  color?:
    | "red"
    | "darkGrey"
    | "white"
    | "black"
    | "statusGreen"
    | "lightRed"
    | "lightRed2"
    | "lightGrey"
    | "blue"
    | "error"
    | "warning";
  isGradientColor?: boolean;
  className?: string;
  textId?: string;
  whiteSpace?: string;
};

interface Props extends TextType {
  children: React.ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  onMouseOut?: React.MouseEventHandler<HTMLElement> | undefined;
  onMouseOver?: React.MouseEventHandler<HTMLElement> | undefined;
}
const TextComp = styled(Typography)<TextType>`
  ${({ h1, h2, h3, h4, h5, title1, title2, body1, body2, body3, fontSize }) => {
    if (fontSize)
      return css`
        font-size: ${fontSize}px;
      `;
    if (h1)
      return css`
        font-size: 32px;
      `;
    if (h2)
      return css`
        font-size: 28px;
      `;
    if (h3)
      return css`
        font-size: 26px;
      `;
    if (h4)
      return css`
        font-size: 24px;
      `;
    if (h5)
      return css`
        font-size: 22px;
      `;
    if (title1)
      return css`
        font-size: 20px;
      `;
    if (title2)
      return css`
        font-size: 18px;
      `;
    if (body1)
      return css`
        font-size: 14px;
      `;
    if (body2)
      return css`
        font-size: 12px;
      `;
    if (body3)
      return css`
        font-size: 10px;
      `;
    return css`
      font-size: 16px;
    `;
  }}
  font-family: ${({ fontFamily }) => fontFamily || `Noto Sans Thai,Noto Sans`};
  font-weight: ${({ bold, semiBold, medium, light }) => {
    if (bold) {
      return 700;
    }
    if (semiBold) {
      return 600;
    }
    if (medium) {
      return 500;
    }
    if (light) {
      return 300;
    }
    return 400;
  }};
  z-index: 2;
  ${({ left, center, right }) => {
    if (left) {
      return css`
        text-align: left;
      `;
    }
    if (center) {
      return css`
        text-align: center;
      `;
    }
    if (right) {
      return css`
        text-align: right;
      `;
    }
    return css``;
  }};
  color: ${({ color }) => (color ? theme.color[color] : theme.color.red)};
  ${({ isGradientColor }) => {
    if (isGradientColor) {
      return css`
        background-image: linear-gradient(
          90deg,
          #e3bf58 0%,
          #f9df7b 36%,
          #fff3a6 67%,
          #f9df7b 100%
        );
        background-size: 100%;
        background-repeat: repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      `;
    }
    return ``;
  }};
  line-height: 1.5;
  ${({ whiteSpace }) => {
    if (whiteSpace) {
      return css`
        white-space: ${whiteSpace};
      `;
    }
    return css``;
  }};
`;

export default function Text({
  children,
  isGradientColor = false,
  ...props
}: Props) {
  return (
    <TextComp
      id={props.textId}
      isGradientColor={isGradientColor}
      onMouseOut={props?.onMouseOut}
      onMouseOver={props?.onMouseOver}
      {...props}
    >
      {children}
    </TextComp>
  );
}
