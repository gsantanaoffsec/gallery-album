import React from 'react'
import { type VariantProps } from 'tailwind-variants'
import SpinnerIcon from '../assets/icons/spinner.svg?react'
import {
  buttonIconIconVariants,
  buttonIconVariants,
} from './button-icon.variants'
import Icon from './icon'

interface ButtonIconProps
  extends
    VariantProps<typeof buttonIconVariants>,
    Omit<React.ComponentProps<'button'>, 'size' | 'disabled'> {
  icon: React.ComponentProps<typeof Icon>['svg']
  handling?: boolean
}

export default function ButtonIcon({
  variant,
  size,
  disabled,
  className,
  icon,
  handling,
  ...props
}: ButtonIconProps) {
  return (
    <button
      className={buttonIconVariants({
        variant,
        size,
        disabled,
        className,
        handling,
      })}
      {...props}
    >
      <Icon
        svg={handling ? SpinnerIcon : icon}
        animate={handling}
        className={buttonIconIconVariants({ variant, size })}
      />
    </button>
  )
}
