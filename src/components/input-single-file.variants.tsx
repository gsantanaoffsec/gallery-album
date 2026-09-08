import { tv } from 'tailwind-variants'

export const inputSingleFileVariants = tv({
  base: `
    flex flex-col items-center justify-center w-full
    border border-solid border-border-primary
    group-hover:border-border-active rounded-lg
    gap-1 transition 
    `,
  variants: {
    size: {
      md: 'px-5 py-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const inputSingleFileIconVariants = tv({
  base: `
    fill-placeholder
    `,
  variants: {
    size: {
      md: 'w-8 h-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
