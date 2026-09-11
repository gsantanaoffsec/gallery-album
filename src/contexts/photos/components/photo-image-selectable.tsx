import React from 'react'
import ImagePreview from '../../../components/image-preview'
import InputCheckBox from '../../../components/input-checkbox'
import {photoImageSelectableVariants} from '../../../contexts/photos/components/photo-image-selectable.variants'

interface PhotoImageSelectableProps extends React.ComponentProps<
  typeof ImagePreview
> {
  selected?: boolean
  onSelectImage?: (selected: boolean) => void
}

export default function PhotoImageSelectable({
  selected,
  className,
  onSelectImage,
  ...props
}: PhotoImageSelectableProps) {
  const [isSelected, setIsSelected] = React.useState(selected)

function handleSelect() {
    const newValue = !isSelected

    setIsSelected(newValue)

    onSelectImage?.(newValue)
}

  return (
    <label
      className={photoImageSelectableVariants({
        className,
        select: isSelected,
      })}
    >
      <InputCheckBox
        size="sm"
        defaultChecked={isSelected}
        onChange={handleSelect}
        className="absolute top-1 left-1"
      />
      <ImagePreview {...props} />
    </label>
  )
}
