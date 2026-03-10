export const fontFamily = {
  lato: "'Lato', sans-serif",
  inter: "'Inter', sans-serif",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

export const typography = {
  title1: {
    fontFamily: fontFamily.lato,
    fontSize: '32px',
    fontWeight: fontWeight.medium,
    lineHeight: 1.2,
    letterSpacing: '0px',
  },
  title2: {
    fontFamily: fontFamily.lato,
    fontSize: '26px',
    fontWeight: fontWeight.regular,
    lineHeight: 1.2,
    letterSpacing: '0px',
  },
  title3: {
    fontFamily: fontFamily.lato,
    fontSize: '18px',
    fontWeight: fontWeight.medium,
    lineHeight: 1.2,
    letterSpacing: '0px',
  },
  title4: {
    fontFamily: fontFamily.inter,
    fontSize: '16px',
    fontWeight: fontWeight.bold,
    lineHeight: 1.2,
    letterSpacing: '0px',
  },
  bodyRegular: {
    fontFamily: fontFamily.inter,
    fontSize: '14px',
    fontWeight: fontWeight.regular,
    lineHeight: 1.4,
    letterSpacing: '0.2px',
  },
  bodyBold: {
    fontFamily: fontFamily.inter,
    fontSize: '14px',
    fontWeight: fontWeight.bold,
    lineHeight: 1.4,
    letterSpacing: '0.2px',
  },
  bodySmall: {
    fontFamily: fontFamily.inter,
    fontSize: '12px',
    fontWeight: fontWeight.regular,
    lineHeight: 1.4,
    letterSpacing: '0.2px',
  },
  bodySmallBold: {
    fontFamily: fontFamily.inter,
    fontSize: '12px',
    fontWeight: fontWeight.bold,
    lineHeight: 1.4,
    letterSpacing: '0.2px',
  },
  tooltip: {
    fontFamily: fontFamily.inter,
    fontSize: '10px',
    fontWeight: fontWeight.regular,
    lineHeight: 1.4,
    letterSpacing: '0.2px',
  },
  tooltipMedium: {
    fontFamily: fontFamily.inter,
    fontSize: '10px',
    fontWeight: fontWeight.medium,
    lineHeight: 1.4,
    letterSpacing: '0.2px',
  },
} as const;

export type TypographyKey = keyof typeof typography;
