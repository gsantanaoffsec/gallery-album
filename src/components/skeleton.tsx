import React from 'react'
import { type VariantProps } from 'tailwind-variants'
import skeletonVariants from './skeleton.variants'

interface SkeletonProps
  extends VariantProps<typeof skeletonVariants>, React.ComponentProps<'div'> {}

export default function Skeleton({
  rounded,
  className,
  ...props
}: SkeletonProps) {
  return <div className={skeletonVariants({ rounded, className })} {...props} />
}
