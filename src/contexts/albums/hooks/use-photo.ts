import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api, fetcher } from '../../../helpers/api'
import type { Photo } from '../../photos/models/photo'
import type { PhotoNewFormSchema } from '../../photos/schemas'

interface PhotoDetailResponse extends Photo {
  nextPhotoId?: string
  previousPhotoId?: string
}

export default function usePhoto(id?: string) {
  const { data, isLoading } = useQuery<PhotoDetailResponse>({
    queryKey: ['photo', id],
    queryFn: () => fetcher(`/photos/${id}`),
    // Conversão para boolean
    enabled: !!id,
  })

  const queryClient = useQueryClient()

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
        await api.put(`/photos/${photo.id}/albums`, {
          albumsIds: payload.albumsIds,
        })
      }
    } catch (error) {
      toast.error('Erro ao criar foto!')
      throw error
    }
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
  }
}
