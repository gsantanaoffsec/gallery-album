import { tv } from 'tailwind-variants'

const containerVariants = tv({
  base: 'mx-auto',
  variants: {
    size: {
      md: 'max-w-[62rem] px-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export default containerVariants
