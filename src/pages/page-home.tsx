import Container from '../components/container'
import AlbumsFilter from '../contexts/albums/components/albums-filter'
import PhotosList from '../contexts/photos/components/photos-list'

export default function PageHome() {
  return (
    <Container>
      <AlbumsFilter
        albums={[
          { id: '1155', title: 'Album de Teste 1' },
          { id: '2266', title: 'Album de Teste 2' },
          { id: '3377', title: 'Album de Teste 3' },
        ]}
        className="mb-9"
      />
      <PhotosList
        photos={[
          {
            id: '111',
            title: 'Hello World!',
            imageId: 'portrait-tower.png',
            albums: [
              { id: '1155', title: 'Album de Teste 1' },
              { id: '2266', title: 'Album de Teste 2' },
              { id: '3377', title: 'Album de Teste 3' },
            ],
          },
          {
            id: '222',
            title: 'Hello World!',
            imageId: 'portrait-tower.png',
            albums: [
              { id: '1155', title: 'Album de Teste 1' },
              { id: '2266', title: 'Album de Teste 2' },
              { id: '3377', title: 'Album de Teste 3' },
            ],
          },
        ]}
      />
    </Container>
  )
}
