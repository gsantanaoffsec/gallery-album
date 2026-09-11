import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { api, fetcher } from '../../../helpers/api'
import type { Photo } from '../../photos/models/photo'
import type { PhotoNewFormSchema } from '../../photos/schemas'
import usePhotoAlbums from './use-photo-albums'

interface PhotoDetailResponse extends Photo {
  nextPhotoId?: string
  previousPhotoId?: string
}

export default function usePhoto(id?: string) {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery<PhotoDetailResponse>({
    queryKey: ['photo', id],
    queryFn: () => fetcher(`/photos/${id}`),
    // Conversão para boolean
    enabled: !!id,
  })

  const queryClient = useQueryClient()
  const { managePhotoOnAlbum } = usePhotoAlbums()

  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      const { data: photo } = await api.post<Photo>('/photos', {
        title: payload.title,
      })
      await api.post(
        `/photos/${photo.id}/image`,
        {
          file: payload.file[0],
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      queryClient.invalidateQueries({ queryKey: ['photos'] })

      toast.success('Foto criada com sucesso')

      if (payload.albumsIds && payload.albumsIds.length > 0) {
        await managePhotoOnAlbum(photo.id, payload.albumsIds)
      }
    } catch (error) {
      toast.error('Erro ao criar foto!')
      throw error
    }
  }

  async function deletePhoto(photoId: string) {
    try {
      await api.delete(`/photos/${photoId}`)

      toast.success('Foto excluída com sucesso!')

      navigate('/')
    } catch (error) {
      toast.error('Erro ao deletar foto')
      throw error
    }
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
    deletePhoto,
  }
}
