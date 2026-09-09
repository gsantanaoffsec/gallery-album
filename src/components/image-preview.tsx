import type React from 'react'
import { imagePreviewImageVariants, imagePreviewVariants } from './image-preview.variants'

interface ImagePreviewProps extends React.ComponentProps<'img'> {
  imageClassName?: string
}

export default function ImagePreview({
  imageClassName,
  className,
  ...props
}: ImagePreviewProps) {
  return (
    <div className={imagePreviewVariants({ className })}>
      <img className={imagePreviewImageVariants({ className: imageClassName })} {...props} />
    </div>
  )
}
