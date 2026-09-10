import React from 'react'
import SearchIcon from '../assets/icons/search.svg?react'
import usePhotos from '../contexts/photos/hooks/use-photos'
import { debounce } from '../helpers/utils'
import InputText from './input-text'

export default function PhotosSearch() {
  const [inputValue, setInputValue] = React.useState('')
  const { filters } = usePhotos()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetValue = React.useCallback(
    debounce((value: string) => {
      filters.setQ(value)
    }, 500),
    [filters.setQ],
  )

  // Evento de mudança do React disparado por um elemento HTML <input>.
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    console.log(`Campo de texto ${value}`)

    setInputValue(value)
    debouncedSetValue(value)
  }

  return (
    <InputText
      icon={SearchIcon}
      placeholder="Buscar fotos"
      className="flex-1"
      value={inputValue}
      onChange={handleInputChange}
    />
  )
}
