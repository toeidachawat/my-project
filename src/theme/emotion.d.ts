import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: Color;
  }

  interface Color {
    red: string;
    darkGrey: string;
    white: string;
    black: string;
    statusGreen: string;
    lightRed: string;
    lightRed2: string;
    lightGrey: string;
    blue: string;
    error: string;
    warning: string;
  }
}
