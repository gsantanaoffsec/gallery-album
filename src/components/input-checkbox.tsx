import type React from 'react'
import type { VariantProps } from 'tailwind-variants'
import CheckIcon from '../assets/icons/check.svg?react'
import Icon from './icon'
import {
  inputCheckboxIconVariants,
  inputCheckboxVariants,
  inputCheckboxWrapperVariants,
} from './input-checkbox.variants'

interface InputCheckboxProps
  extends
    VariantProps<typeof inputCheckboxVariants>,
    Omit<React.ComponentProps<'input'>, 'size'> {}

export default function InputCheckBox({
  variant,
  size,
  disabled,
  className,
  ...props
}: InputCheckboxProps) {
  return (
    <label className={inputCheckboxWrapperVariants({ className, disabled })}>
      <input
        type="checkbox"
        className={inputCheckboxVariants({ variant, size })}
        {...props}
      />
      <Icon svg={CheckIcon} className={inputCheckboxIconVariants({ size })} />
    </label>
  )
}
