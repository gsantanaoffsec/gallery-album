import { tv } from 'tailwind-variants'

const skeletonVariants = tv({
  base: 'animate-pulse bg-background-secondary pointer-events-none',
  variants: {
    rounded: {
      sm: 'rounded-sm',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    rounded: 'lg',
  },
})

export default skeletonVariants
