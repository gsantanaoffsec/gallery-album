import type React from 'react'
import type { VariantProps } from 'tailwind-variants'
import Icon from './icon'
import {
  inputTextContainerVariants,
  inputTextIconVariants,
  inputTextVariants,
  inputTextWrapperVariants,
} from './input-text.variants'
import Text from './text'

interface InputTextProps
  extends
    VariantProps<typeof inputTextWrapperVariants>,
    Omit<React.ComponentProps<'input'>, 'size' | 'disabled'> {
  icon?: React.ComponentProps<typeof Icon>['svg']
  error?: React.ReactNode
}

export default function InputText({
  size,
  disabled,
  className,
  icon,
  error,
  ...props
}: InputTextProps) {
  return (
    <div className={inputTextContainerVariants({ className })}>
      <div className={inputTextWrapperVariants({ size, disabled })}>
        {icon && (
          <Icon svg={icon} className={inputTextIconVariants({ size })} />
        )}
        <input
          className={inputTextVariants()}
          disabled={disabled as boolean}
          {...props}
        />
      </div>
      {error && (
        <Text variant="label-small" className="text-accent-red">
          Um erro do campo!
        </Text>
      )}
    </div>
  )
}
