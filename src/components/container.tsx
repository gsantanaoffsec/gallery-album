import React from 'react'
import { type VariantProps } from 'tailwind-variants'
import containerVariants from './container.variants'

interface ContainerProps
  extends VariantProps<typeof containerVariants>, React.ComponentProps<'div'> {
  as?: keyof React.JSX.IntrinsicElements
}

export default function Container({
  as = 'div',
  children,
  className,
  ...props
}: ContainerProps) {
  return React.createElement(
    as,
    {
      className: containerVariants({ size: 'md', className }),
      ...props,
    },
    children,
  )
}
