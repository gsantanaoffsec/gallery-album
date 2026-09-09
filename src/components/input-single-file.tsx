import React from 'react'
import { useWatch } from 'react-hook-form'
import type { VariantProps } from 'tailwind-variants'
import FileImageIcon from '../assets/icons/image.svg?react'
import UploadFileIcon from '../assets/icons/upload-file.svg?react'
import Icon from './icon'
import {
  inputSingleFileIconVariants,
  inputSingleFileVariants,
} from './input-single-file.variants'
import Text from './text'
import textVariants from './text.variants'

interface InputSingleFileProps
  extends
    VariantProps<typeof inputSingleFileVariants>,
    Omit<React.ComponentProps<'input'>, 'size'> {
  form: any
  allowedExtensions: string[]
  maxFileSizeInMb: number
  replaceBy: React.ReactNode
  error?: React.ReactNode
}

export default function InputSingleFile({
  form,
  size,
  error,
  allowedExtensions,
  maxFileSizeInMb,
  replaceBy,
  ...props
}: InputSingleFileProps) {
  const formValues = useWatch({ control: form.control })

  const name = props.name || ''
  // Arquivo do FORMULÁRIO do TIPO arquivo
  const formFile: File = React.useMemo(
    () => formValues[name]?.[0],
    [formValues, name],
  )

  const { fileExtension, fileSize } = React.useMemo(
    () => ({
      fileExtension: formFile?.name?.split('.')?.pop()?.toLowerCase() || '',
      fileSize: formFile?.size || 0,
    }),
    [formFile],
  )

  function isValidExtension() {
    return allowedExtensions.includes(fileExtension)
  }

  function isValidSize() {
    return fileSize <= maxFileSizeInMb * 1024 * 1024
  }

  function isValidFile() {
    return isValidExtension() && isValidSize()
  }

  return (
    <div>
      {!formFile || !isValidFile() ? (
        <>
          <div className="w-full relative group cursor-pointer">
            <input
              type="file"
              className={`
            absolute top-0 right-0 w-full h-full
            opacity-0 cursor-pointer
            `}
              {...props}
            />
            <div className={inputSingleFileVariants({ size })}>
              <Icon
                svg={UploadFileIcon}
                className={inputSingleFileIconVariants({ size })}
              />
              <Text
                variant="label-medium"
                className="text-placeholder text-center"
              >
                Arraste o arquivo aqui
                <br />
                ou clique para selecionar
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {formFile && !isValidExtension() && (
              <Text variant="label-small" className="text-accent-red">
                Tipo de arquivo inválido
              </Text>
            )}
            {formFile && !isValidSize() && (
              <Text variant="label-small" className="text-accent-red">
                O tamanho do arquivo ultrapassa o tamanho máximo!
              </Text>
            )}
            {error && (
              <Text variant="label-small" className="text-accent-red">
                {error}
              </Text>
            )}
          </div>
        </>
      ) : (
        <>
          {replaceBy}
          <div
            className={`
        flex gap-3 items-center border
        border-solid border-border-primary
        mt-5 p-3 rounded
        `}
          >
            <Icon svg={FileImageIcon} className="fill-white w-6 h-6" />
            <div className="flex flex-col">
              <div className="truncate max-w-80 ">
                <Text variant="label-medium" className="text-placeholder">
                  {formFile.name}
                </Text>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className={textVariants({
                    variant: 'label-small',
                    className: 'text-accent-red cursor-pointer hover:underline',
                  })}
                  onClick={() => {
                    form.setValue(name, undefined)
                  }}
                >
                  Remover
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
