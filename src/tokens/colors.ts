// -----------------------------------------------------------------------------
// Color Scales
// -----------------------------------------------------------------------------

export const fire = {
  100: '#F9DFD8',
  200: '#F4BFB2',
  300: '#EE9F8B',
  400: '#E97F65',
  500: '#E35F3E',
  600: '#B64C32',
  700: '#883925',
  800: '#5B2619',
} as const;

export const blue = {
  100: '#F0F2F4',
  200: '#E0E5EA',
  300: '#B2BECA',
  400: '#93A4B4',
  500: '#647D94',
  600: '#506476',
  800: '#17212F',
} as const;

export const neutrals = {
  200: '#E6E6E6',
  300: '#CCCCCC',
  500: '#999999',
  700: '#666666',
  800: '#333333',
  black: '#000000',
  white: '#FFFFFF',
} as const;

// -----------------------------------------------------------------------------
// Brand Semantic Aliases
// -----------------------------------------------------------------------------

export const special = {
  fire500: '#E35F3E',
} as const;

export const secondary = {
  darkBlue500: '#242452',
  steelBlue500: '#647D94',
  tan: '#F1ECE8',
  offWhite: '#F8F8F8',
} as const;

// -----------------------------------------------------------------------------
// Text & Icons
// -----------------------------------------------------------------------------

export const text = {
  header: '#242452',
  body: '#333333',
  bodyWhite: '#FFFFFF',
  disabled: '#666666',
  buttonColor: '#FFFFFF',
  buttonWhite: '#26374E',
  verticalNav: '#FFFFFF',
} as const;

// -----------------------------------------------------------------------------
// Surfaces & Backgrounds
// -----------------------------------------------------------------------------

export const surface = {
  page: '#F8F8F8',
  container: '#FFFFFF',
  containerWithin: '#F8F8F8',
  inputDefault: '#FFFFFF',
  inputDisabled: '#F8F8F8',
  modal: '#FFFFFF',
  modalBackground: '#5C6778',
  brandPrimary: '#E35F3E',
  brandSecondary: '#242452',
  brandTertiary: '#647D94',
  selected: '#F5F1EE',
} as const;

export const overlay = {
  white50: 'rgba(255, 255, 255, 0.5)',
  darkBlue50: 'rgba(36, 36, 82, 0.5)',
} as const;

// -----------------------------------------------------------------------------
// Borders
// -----------------------------------------------------------------------------

export const border = {
  primary: '#CCCCCC',
  secondary: '#E6E6E6',
  input: '#CCCCCC',
  stays: '#E35F3E',
  bookings: '#26374E',
  aggregate: '#647D94',
} as const;

// -----------------------------------------------------------------------------
// Interactive States
// -----------------------------------------------------------------------------

export const focus = {
  default: '#1362F7',
} as const;

export const buttons = {
  // Special (Fire orange — high-impact CTA)
  specialEnabled: '#E35F3E',
  specialHover: '#B64C32',
  specialActive: '#883925',
  // Primary (Dark navy — main action)
  primaryEnabled: '#242452',
  primaryHover: '#647D94',
  primaryActive: '#17212F',
  // Secondary (White with navy border — supporting action)
  secondaryEnabledBorder: '#242452',
  secondaryEnabledFilled: '#FFFFFF',
  secondaryText: '#26374E',
  secondaryHover: '#647D94',
  secondaryActive: '#17212F',
  // Ghost (transparent — minimal weight)
  ghostHover: '#E6E6E6',
  ghostActive: '#CCCCCC',
  // Link (blue text — navigational)
  linkEnabled: '#1362F7',
  linkHover: '#0D53D6',
  // Destructive (red — irreversible actions)
  destructiveEnabled: '#E02F2F',
  destructiveHover: '#B32525',
  destructiveActive: '#861C1C',
  // Shared states
  disabled: '#E6E6E6',
  focused: '#1362F7',
} as const;

// -----------------------------------------------------------------------------
// Status & Semantic
// -----------------------------------------------------------------------------

export const semantic = {
  success: '#488F31',
  error: '#E02F2F',
  warning: '#C86400',
  info: '#005A9E',
} as const;

export const status = {
  success: '#E2F9F1',
  critical: '#F9DFD8',
  warning: '#FEF7E3',
  active: '#CBE8FF',
  neutral: '#E0E5EA',
} as const;

export const alerts = {
  criticalBackground: '#F9DFD8',
  warningBackground: '#FEF7E3',
  successBackground: '#E2F9F1',
  infoBackground: '#CBE8FF',
  critical: '#C86400',
  warning: '#E02F2F',
  success: '#488F31',
  info: '#005A9E',
} as const;

// -----------------------------------------------------------------------------
// Component-Specific
// -----------------------------------------------------------------------------

export const tooltip = {
  default: '#333333',
} as const;

export const toggle = {
  offCircle: '#17212F',
  offBar: '#506476',
  onCircle: '#999999',
  onBar: '#CCCCCC',
  icon: '#FFFFFF',
} as const;

export const badges = {
  alpha: '#C0316D',
  beta: '#6966B1',
  new: '#FFFFFF',
  stroke: '#B2BECA',
} as const;

export const chips = {
  critical: '#F9DFD8',
  warning: '#FEF7E3',
  success: '#E2F9F1',
  active: '#CBE8FF',
  neutral: '#E0E5EA',
  text: '#333333',
} as const;

export const calendar = {
  selectedStartDate: '#26374E',
  selectedEndDate: '#26374E',
  dateHover: '#647D94',
  selectedBetweenDate: '#D1D5DB',
} as const;

// -----------------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------------

export const navPrimary = {
  background: '#242452',
  activeBackground: '#17212F',
  activeBorder: '#E35F3E',
  hover: '#17212F',
} as const;

export const navSecondary = {
  default: '#666666',
  active: '#E35F3E',
  hover: '#26374E',
} as const;

// -----------------------------------------------------------------------------
// Data Visualization
// -----------------------------------------------------------------------------

export const dataViz = {
  categorical: {
    1: '#E35F3E',
    2: '#26374E',
    3: '#BAD8F0',
    4: '#5998BC',
    5: '#39EEC0',
    6: '#155126',
    7: '#52A15A',
    8: '#ABE65B',
    9: '#893C02',
    10: '#FDCC93',
    11: '#C0316D',
    12: '#FE85AD',
    13: '#473B63',
    14: '#6966B1',
    15: '#F5FC48',
    16: '#333333',
    '1alt': '#F4BFB2',
    '2alt': '#939AA7',
    '2alt2': '#505C70',
    '9alt': '#B45644',
    '9alt2': '#A15246',
    '9alt3': '#854C49',
    '13alt': '#5F434B',
    '13alt2': '#3F3C4D',
    '13alt3': '#72678B',
  },
  diverging: {
    high: '#E35F3E',
    midHigh: '#F9A790',
    mid: '#F1F1F1',
    midLow: '#8D94A2',
    low: '#26374E',
  },
  positiveToNegative: {
    positive: '#488F31',
    midPositive: '#9FC08F',
    mid: '#F1F1F1',
    mid2: '#F9BF4E',
    midNegative: '#F5998B',
    negative: '#E02F2F',
  },
} as const;
