import React from 'react'
import { type VariantProps } from 'tailwind-variants'
import iconVariants from './icon.variants'

interface IconProps
  extends React.ComponentProps<'svg'>, VariantProps<typeof iconVariants> {
  svg: React.FC<React.ComponentProps<'svg'>>
}

export default function Icon({
  svg: SvgComponent,
  animate,
  className,
  ...props
}: IconProps) {
  return (
    <SvgComponent className={iconVariants({ animate, className })} {...props} />
  )
}
