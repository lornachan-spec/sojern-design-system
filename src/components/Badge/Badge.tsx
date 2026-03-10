import React, { CSSProperties } from 'react';
import { badges, text } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/** The release stage shown in the badge label */
export type BadgeStage = 'alpha' | 'beta' | 'new';

/**
 * Where the badge is placed:
 * - `on-page`: light background (white/grey surfaces) — uses filled colours for Alpha/Beta, white pill for New
 * - `navigation`: dark nav background — all variants render as transparent with a light stroke and white text
 */
export type BadgePlacement = 'on-page' | 'navigation';

export interface BadgeProps {
  /** The feature release stage to label */
  stage: BadgeStage;
  /** Surface context — controls colour scheme. Defaults to `on-page`. */
  placement?: BadgePlacement;
  className?: string;
  style?: CSSProperties;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const LABELS: Record<BadgeStage, string> = {
  alpha: 'Alpha',
  beta: 'Beta',
  new: 'New',
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Badge — small pill label indicating a feature's release stage (Alpha / Beta / New).
 *
 * Supports two placement contexts:
 * - `on-page` (default): coloured fills on light surfaces
 * - `navigation`: transparent with border for use on dark nav backgrounds
 */
export function Badge({ stage, placement = 'on-page', className, style }: BadgeProps) {
  const isNavigation = placement === 'navigation';
  const isNewOnPage = !isNavigation && stage === 'new';

  const getBackgroundColor = (): string => {
    if (isNavigation) return 'transparent';
    if (stage === 'alpha') return badges.alpha;
    if (stage === 'beta') return badges.beta;
    return badges.new; // new on-page = white
  };

  const getTextColor = (): string => {
    // "New" on a light surface uses dark body text; all other variants use white
    if (isNewOnPage) return text.body;
    return '#FFFFFF';
  };

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 14,
    paddingTop: 0,
    paddingBottom: 1,
    paddingLeft: spacing.SM,
    paddingRight: spacing.SM,
    borderRadius: 40,
    backgroundColor: getBackgroundColor(),
    border: isNavigation || isNewOnPage ? `1px solid ${badges.stroke}` : 'none',
    boxSizing: 'border-box',
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontFamily: typography.tooltipMedium.fontFamily,
    fontSize: typography.tooltipMedium.fontSize,
    fontWeight: typography.tooltipMedium.fontWeight,
    lineHeight: typography.tooltipMedium.lineHeight,
    letterSpacing: '0.3px',
    color: getTextColor(),
    whiteSpace: 'nowrap',
    margin: 0,
    padding: 0,
  };

  return (
    <div style={containerStyle} className={className}>
      <span style={labelStyle}>{LABELS[stage]}</span>
    </div>
  );
}
