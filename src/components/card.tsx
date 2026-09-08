import React from 'react'
import { type VariantProps } from 'tailwind-variants'
import cardVariants from './card.variants'

interface CardProps
  extends VariantProps<typeof cardVariants>, React.ComponentProps<'div'> {
  as?: keyof React.JSX.IntrinsicElements
}

export default function Card({
  as = 'div',
  size,
  variant,
  children,
  className,
  ...props
}: CardProps) {
  return React.createElement(
    as,
    {
      className: cardVariants({ size, variant, className }),
      ...props,
    },
    children,
  )
}
