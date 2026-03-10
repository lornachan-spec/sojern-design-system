export const radius = {
  button: 5,
  card: 10,
  container: 10,
} as const;

export type RadiusKey = keyof typeof radius;
