import React, { CSSProperties, InputHTMLAttributes } from 'react';
import { text, semantic, typography } from '../../tokens';
import { Icon } from '../Icons';
import { Tooltip } from '../Tooltip';
import { TextInput } from '../TextInput';
import type { TextInputSize } from '../TextInput';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type FormFieldLayout = 'default' | 'inline';

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label displayed above (or before) the input */
  label?: string;
  /** Show the ⓘ info icon next to the label */
  showInfoIcon?: boolean;
  /** Tooltip text shown on hover over the info icon */
  infoTooltip?: string;
  /** Helper text shown below the input — hidden when error is present */
  helperText?: string;
  /** Error message — also applies the error state to the input */
  error?: string;
  /**
   * Layout variant:
   * - `default` — label stacked above a full-width input
   * - `inline` — label row above a [prefixText + short input + suffixText] row
   */
  layout?: FormFieldLayout;
  /** Text placed to the left of the input in inline layout */
  prefixText?: string;
  /** Text placed to the right of the input in inline layout */
  suffixText?: string;
  /** Size forwarded to TextInput — defaults to 'default' for stacked, 'numeric' for inline */
  inputSize?: TextInputSize;
  /** Wrapper className */
  className?: string;
  /** Wrapper style */
  style?: CSSProperties;
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

function LabelRow({ label, showInfoIcon, infoTooltip }: { label: string; showInfoIcon?: boolean; infoTooltip?: string }) {
  const labelStyle: CSSProperties = {
    fontFamily: typography.bodyBold.fontFamily,
    fontSize: typography.bodyBold.fontSize,
    fontWeight: typography.bodyBold.fontWeight,
    lineHeight: typography.bodyBold.lineHeight,
    letterSpacing: typography.bodyBold.letterSpacing,
    color: text.body,
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span style={labelStyle}>{label}</span>
      {showInfoIcon && (
        infoTooltip ? (
          <Tooltip content={infoTooltip} position="top">
            <Icon name="Info" size={16} color={text.body} aria-label={infoTooltip} />
          </Tooltip>
        ) : (
          <Icon name="Info" size={16} color={text.body} aria-label="More information" />
        )
      )}
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  const textStyle: CSSProperties = {
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    color: semantic.error,
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <Icon name="Warning Filled" size={16} color={semantic.error} aria-hidden />
      <span style={textStyle}>{message}</span>
    </div>
  );
}

function HelperText({ text: helperText }: { text: string }) {
  const style: CSSProperties = {
    fontFamily: typography.bodySmall.fontFamily,
    fontSize: typography.bodySmall.fontSize,
    fontWeight: typography.bodySmall.fontWeight,
    lineHeight: typography.bodySmall.lineHeight,
    letterSpacing: typography.bodySmall.letterSpacing,
    color: text.body,
  };

  return <span style={style}>{helperText}</span>;
}

function InlineLabel({ children }: { children: React.ReactNode }) {
  const style: CSSProperties = {
    fontFamily: typography.bodyRegular.fontFamily,
    fontSize: typography.bodyRegular.fontSize,
    fontWeight: typography.bodyRegular.fontWeight,
    lineHeight: typography.bodyRegular.lineHeight,
    letterSpacing: typography.bodyRegular.letterSpacing,
    color: text.body,
    whiteSpace: 'nowrap',
  };
  return <span style={style}>{children}</span>;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function FormField({
  label,
  showInfoIcon = true,
  infoTooltip,
  helperText,
  error,
  layout = 'default',
  prefixText,
  suffixText,
  inputSize,
  className,
  style,
  // Input props forwarded to TextInput
  value,
  defaultValue,
  placeholder,
  disabled,
  onChange,
  onFocus,
  onBlur,
  type,
  ...rest
}: FormFieldProps) {
  const isInline = layout === 'inline';
  const resolvedInputSize = inputSize ?? (isInline ? 'numeric' : 'default');

  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    ...style,
  };

  const inputProps = {
    value,
    defaultValue,
    placeholder,
    disabled,
    onChange,
    onFocus,
    onBlur,
    type,
    error: !!error,
    size: resolvedInputSize,
    ...rest,
  };

  return (
    <div style={wrapperStyle} className={className}>
      {/* Label row */}
      {label && <LabelRow label={label} showInfoIcon={showInfoIcon} infoTooltip={infoTooltip} />}

      {/* Input area */}
      {isInline ? (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          {prefixText && (
            <div style={{ display: 'flex', alignItems: 'center', height: 34 }}>
              <InlineLabel>{prefixText}</InlineLabel>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <TextInput {...inputProps} />
            {error && <ErrorMessage message={error} />}
          </div>
          {suffixText && (
            <div style={{ display: 'flex', alignItems: 'center', height: 34 }}>
              <InlineLabel>{suffixText}</InlineLabel>
            </div>
          )}
        </div>
      ) : (
        <>
          <TextInput {...inputProps} wrapperStyle={{ width: '100%' }} />
          {error
            ? <ErrorMessage message={error} />
            : helperText
              ? <HelperText text={helperText} />
              : null
          }
        </>
      )}
    </div>
  );
}
