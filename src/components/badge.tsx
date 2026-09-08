import cx from 'classnames'
import React from 'react'
import { type VariantProps } from 'tailwind-variants'
import {
  badgeSkeletonVariants,
  badgeTextVariants,
  badgeVariants,
} from './badge.variants'
import Skeleton from './skeleton'
import Text from './text'

interface BadgeProps
  extends React.ComponentProps<'div'>, VariantProps<typeof badgeVariants> {
  loading?: boolean
}

export default function Badge({
  variant,
  size,
  className,
  children,
  loading,
  ...props
}: BadgeProps) {
  if (loading) {
    return (
      <Skeleton
        rounded="full"
        className={cx(
          badgeVariants({ variant: 'none' }),
          badgeSkeletonVariants({ size }),
          className,
        )}
      />
    )
  }

  return (
    <div className={badgeVariants({ variant, size, className })} {...props}>
      <Text className={badgeTextVariants({ size })}>{children}</Text>
    </div>
  )
}
