import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: 'flex items-center justify-center cursor-pointer transition rounded group gap-1',
  variants: {
    variant: {
      primary: 'bg-accent-brand hover:bg-accent-brand-light',
      secondary: 'bg-background-secondary hover:bg-background-tertiary',
      destructive: 'bg-background-secondary hover:bg-background-tertiary',
      ghost: `
					bg-transparent border border-solid border-border-primary
				text-accent-paragraph hover:border-background-secondary
				`,
    },
    size: {
      sm: 'h-7 py-1 px-3',
      md: 'h-10 py-2 pl-3 pr-3',
    },
    disabled: {
      true: 'opacity-50 pointer-events-none',
    },
    handling: {
      true: 'pointer-events-none',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    handling: false,
  },
})

export const buttonTextVariants = tv({
  variants: {
    variant: {
      primary: 'text-label-inverse',
      secondary: 'text-label',
      destructive: 'text-accent-red',
      ghost: 'text-accent-paragraph',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export const buttonIconVariants = tv({
  variants: {
    variant: {
      primary: 'fill-label-inverse',
      secondary: 'fill-label',
      destructive: 'fill-accent-red',
      ghost: 'fill-accent-paragraph',
    },
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
    },
    handling: {
      true: 'w-4 h-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
