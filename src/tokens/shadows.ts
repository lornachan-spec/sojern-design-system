export const shadows = {
  light: '3px 3px 20px 0px rgba(0, 0, 0, 0.15)',
  dark: '0px 0px 20px 4px rgba(0, 0, 0, 0.15)',
  hover: '5px 5px 20px 0px rgba(0, 0, 0, 0.30)',
} as const;

export type ShadowKey = keyof typeof shadows;
