import { tv } from 'tailwind-variants'

export const imagePreviewVariants = tv({
  base: `
    rounded-lg overflow-hidden
    `,
})

export const imagePreviewImageVariants = tv({
  base: `
    w-full h-full object-cover
    `,
})
