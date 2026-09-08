import cx from 'classnames'
import React from 'react'
import { type VariantProps } from 'tailwind-variants'
import SpinnerIcon from '../assets/icons/spinner.svg?react'
import {
  buttonIconVariants,
  buttonTextVariants,
  buttonVariants,
} from './button.variants'
import Icon from './icon'
import Text from './text'

interface ButtonProps
  extends
    Omit<React.ComponentProps<'button'>, 'size' | 'disabled'>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ComponentProps<typeof Icon>['svg']
  handling?: boolean
}

export default function Button({
  variant,
  size,
  disabled,
  className,
  children,
  handling,
  icon,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({
        variant,
        size,
        disabled,
        handling,
        className: cx(
          {
            'pr-1': icon,
          },
          className,
        ),
      })}
      disabled={disabled as boolean}
      {...props}
    >
      <Text
        variant="label-medium"
        className={buttonTextVariants({ variant, size })}
      >
        {children}
      </Text>
      {(icon || handling) && (
        <Icon
          svg={handling ? SpinnerIcon : icon!}
          animate={handling}
          className={buttonIconVariants({ variant, size, handling })}
        />
      )}
    </button>
  )
}
