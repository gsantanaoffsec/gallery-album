import { type VariantProps } from 'tailwind-variants'
import dividerVariants from './divider.variants'

interface DividerProps
  extends React.ComponentProps<'div'>, VariantProps<typeof dividerVariants> {
  orientation?: 'horizontal' | 'vertical'
}

export default function Divider({
  className,
  orientation = 'horizontal',
  ...props
}: DividerProps) {
  return (
    <div className={dividerVariants({ className, orientation })} {...props} />
  )
}
