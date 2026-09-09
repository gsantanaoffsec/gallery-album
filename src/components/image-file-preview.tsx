import type React from 'react'
import { imageFilePreviewImageVariants, imageFilePreviewVariants } from './image-file-preview.variants'

interface ImageFilePreviewProps extends React.ComponentProps<'img'> {
  imageClassName?: string
}

export default function ImageFilePreview({
  imageClassName,
  className,
  ...props
}: ImageFilePreviewProps) {
  return (
    <div className={imageFilePreviewVariants({ className })}>
      <img className={imageFilePreviewImageVariants({ className: imageClassName })} {...props} />
    </div>
  )
}
