export const spacing = {
  none: 0,
  XS: 4,
  SM: 8,
  MD: 16,
  LRG: 24,
  XL: 32,
  XXL: 40,
} as const;

export type SpacingKey = keyof typeof spacing;
