export const colors = {
  primary:        '#ED1651',
  primaryHover:   '#C8103F',
  primaryActive:  '#A50D34',

  secondary:      '#7C3AED',
  secondaryHover: '#6D28D9',

  dark:           '#1E1E1E',
  darkSurface:    '#1A1A1A',

  textPrimary:    '#101828',
  textSecondary:  '#64748B',
  textMuted:      '#94A3B8',

  border:         '#E2E8F0',
  surface:        '#FFFFFF',
  background:     '#F5F5F5',

  success: '#ECFDF3',
  expired: '#344054',
  "tag-success": '#027A48',
  "tag-expired": '#F2F4F7',
} as const;

// Type helper for autocomplete
export type ColorKey = keyof typeof colors;