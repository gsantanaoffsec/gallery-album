# Resumo: filtro por album, `nuqs` e `createSerializer`

## O que foi adicionado

A aplicacao passou a permitir filtrar as fotos por album. O fluxo funciona de ponta a ponta:

```text
Clique no album
    ↓
albumId vai para a URL
    ↓
usePhotos monta /photos?albumId=...
    ↓
Fastify valida a query
    ↓
PhotosService filtra as relacoes
    ↓
PhotosList exibe as fotos filtradas
```

As principais adicoes foram:

- dependencia `nuqs`;
- `NuqsAdapter` no `App.tsx`;
- filtro visual em `AlbumsFilter`;
- estado do filtro em `usePhotos`;
- serializacao do `albumId` para a URL;
- validacao do parametro no backend;
- filtro usando `photosOnAlbums` no `PhotosService`.

## 1. Dependencia `nuqs`

O pacote foi adicionado ao projeto:

```json
"nuqs": "^2.10.1"
```

`nuqs` permite tratar parametros da URL como estado React. Assim, o filtro fica visivel na URL e pode ser mantido ao recarregar a pagina ou ao usar o historico do navegador.

Exemplo:

```text
/?albumId=550e8400-e29b-41d4-a716-446655440000
```

## 2. `NuqsAdapter` no `App.tsx`

Foi adicionado:

```tsx
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
```

E o adaptador envolve o `BrowserRouter`:

```tsx
<NuqsAdapter>
  <BrowserRouter>
    <Routes>{/* rotas */}</Routes>
  </BrowserRouter>
</NuqsAdapter>
```

Ele conecta o `nuqs` ao React Router, permitindo que `useQueryState` leia e altere os parametros da URL.

## 3. O filtro visual: `AlbumsFilter`

O componente fica em:

```text
src/contexts/albums/components/albums-filter.tsx
```

Ele usa o hook de fotos:

```tsx
const { filters } = usePhotos()
```

O estado pertence ao filtro da lista de fotos, mesmo que os botoes sejam exibidos dentro do contexto de albuns.

### Botao `Todos`

```tsx
<Button
  variant={filters.albumId === null ? 'primary' : 'ghost'}
  onClick={() => filters.setAlbumId(null)}
>
  Todos
</Button>
```

- `albumId === null` indica que nenhum album esta selecionado.
- `primary` destaca o botao ativo.
- `setAlbumId(null)` remove o filtro da URL.
- Sem `albumId`, a API retorna todas as fotos.

### Botoes dos albuns

```tsx
{
  albums.map((album) => (
    <Button
      key={album.id}
      variant={filters.albumId === album.id ? 'primary' : 'ghost'}
      onClick={() => filters.setAlbumId(album.id)}
    >
      {album.title}
    </Button>
  ))
}
```

O `map` cria um botao para cada album. O `key` usa o ID unico do album, o `variant` destaca o album selecionado e o clique salva `album.id` na URL.

Enquanto os albuns carregam, `Array.from({ length: 5 })` cria cinco skeletons temporarios.

## 4. `useQueryState`: estado ligado a URL

No arquivo `src/contexts/photos/hooks/use-photos.ts`:

```ts
const [albumId, setAlbumId] = useQueryState('albumId')
```

Essa linha liga o estado ao parametro chamado `albumId`:

- `albumId`: valor atual da URL, normalmente uma `string` ou `null`;
- `setAlbumId`: altera o parametro;
- `setAlbumId(album.id)`: seleciona um album;
- `setAlbumId(null)`: limpa o filtro.

A URL se torna a fonte de verdade, sem precisar manter uma copia separada com `useState`.

## 5. `parseAsString`

O filtro e configurado assim:

```ts
albumId: parseAsString
```

`parseAsString` informa ao `nuqs` que o valor deve ser tratado como texto. Isso e adequado porque parametros de URL chegam como strings e os IDs dos albuns sao UUIDs.

## 6. `createSerializer`

O serializer e criado assim:

```ts
const toSearchParams = createSerializer({
  albumId: parseAsString,
})
```

`createSerializer` transforma um objeto de filtros em uma query string.

Entrada:

```ts
toSearchParams({ albumId: 'album-123' })
```

Resultado:

```text
?albumId=album-123
```

O nome serializer vem de serializacao: converter uma estrutura de dados em outro formato. Aqui, o objeto JavaScript vira texto para ser anexado a uma URL.

Quando o valor e `null`:

```ts
toSearchParams({ albumId: null })
```

o parametro e omitido. Assim, a requisicao sem filtro fica correta:

```text
/photos
```

em vez de:

```text
/photos?albumId=null
```

Isso evita concatenacoes manuais e trata corretamente valores nulos e a codificacao dos parametros.

## 7. Busca no `usePhotos`

O hook usa React Query:

```ts
const { data, isLoading } = useQuery<Photo[]>({
  queryKey: ['photos'],
  queryFn: () => fetcher(`/photos${toSearchParams({ albumId })}`),
})
```

`useQuery<Photo[]>` informa ao TypeScript que a resposta esperada e uma lista de `Photo`.

A `queryFn` monta a URL e chama o `fetcher`:

```ts
fetcher(`/photos${toSearchParams({ albumId })}`)
```

Com filtro:

```text
/photos?albumId=album-123
```

Sem filtro:

```text
/photos
```

O `fetcher` usa Axios e retorna apenas `res.data`.

O hook entrega:

```ts
return {
  photos: data || [],
  isLoadingPhotos: isLoading,
  filters: {
    albumId,
    setAlbumId,
  },
}
```

- `photos`: resultado da API ou lista vazia enquanto nao existem dados;
- `isLoadingPhotos`: estado de carregamento;
- `filters.albumId`: album selecionado;
- `filters.setAlbumId`: funcao para selecionar ou limpar o album.

## 8. Integracao na `PageHome`

Em `src/pages/page-home.tsx`, a pagina busca albuns e fotos:

```tsx
const { albums, isLoadingAlbums } = useAlbums()
const { photos, isLoadingPhotos } = usePhotos()
```

Depois, passa os albuns para `AlbumsFilter` e as fotos para `PhotosList`.

A pagina nao implementa o filtro; ela apenas conecta os dados e os estados de carregamento aos componentes.

## 9. A lista de fotos

`PhotosList` continua responsavel pela apresentacao:

- mostra a quantidade em `photos.length`;
- mostra skeletons durante o carregamento;
- usa `photos.map` para renderizar os resultados;
- mostra `Nenhuma foto encontrada` quando nao existem resultados.

O filtro ja aconteceu no hook e no backend, entao a lista recebe somente as fotos que deve exibir.

## 10. Validacao da query no backend

O backend recebeu o schema:

```ts
export const photoQuerySchema = z.object({
  albumId: z.string().uuid().optional(),
  q: z.string().optional(),
})
```

`albumId` e opcional, mas, quando existe, precisa ser um UUID valido.

Na rota `GET /photos`:

```ts
const queryResult = photoQuerySchema.safeParse(request.query)
```

Se a query for invalida, a API responde `400` e encerra a busca:

```ts
if (!queryResult.success) {
  reply.status(400).send({
    error: 'Invalid query parameters',
    details: queryResult.error.errors,
  })
  return
}
```

Depois da validacao, os filtros sao enviados ao servico:

```ts
const { albumId, q } = queryResult.data
const photos = await photosService.getAllPhotos(albumId, q)
```

## 11. Filtro no `PhotosService`

O metodo recebe os filtros:

```ts
async getAllPhotos(albumId?: string, q?: string): Promise<Photo[]> {
```

Primeiro, le o banco e considera todas as fotos:

```ts
const db = await this.dbService.readDatabase()
let photos: Photo[] = db.photos
```

Se existir `albumId`, aplica o filtro:

```ts
if (albumId) {
  const photoIds = db.photosOnAlbums
    .filter((relation) => relation.albumId === albumId)
    .map((relation) => relation.photoId)

  photos = photos.filter((photo) => photoIds.includes(photo.id))
}
```

## 12. O papel de `photosOnAlbums`

Uma foto pode pertencer a varios albuns e um album pode conter varias fotos. Isso e uma relacao muitos-para-muitos.

A lista intermediaria guarda relacoes como:

```ts
{
  photoId: 'photo-1',
  albumId: 'album-1',
}
```

O filtro acontece em tres passos:

1. `filter` mantem as relacoes do album escolhido.
2. `map` extrai os IDs das fotos.
3. Outro `filter` mantem as fotos cujos IDs aparecem nessa lista.

Depois, `populatePhotoAlbums` adiciona os albuns de cada foto, permitindo que o frontend continue usando `photo.albums`.

## 13. Resposta final

A rota envia a lista filtrada:

```ts
reply.send(photos)
```

O React Query recebe a resposta, `usePhotos` a retorna e `PhotosList` renderiza o resultado.

Se o album nao tiver fotos, a API devolve uma lista vazia e a interface mostra:

```text
Nenhuma foto encontrada
```

## Ponto de atencao: `queryKey`

Atualmente a chave esta assim:

```ts
queryKey: ['photos']
```

Como o resultado depende do album, uma chave mais precisa seria:

```ts
queryKey: ['photos', { albumId }]
```

Assim, o React Query diferenciaria:

```ts
;['photos', { albumId: null }][('photos', { albumId: 'album-1' })]
```

Esse e um ponto de melhoria da implementacao atual, nao uma alteracao feita neste resumo.

## Resumo final

`AlbumsFilter` exibe os albuns e altera o filtro.

`useQueryState` mantem `albumId` sincronizado com a URL.

`createSerializer` converte o objeto de filtros em query string.

`usePhotos` monta a requisicao e busca as fotos.

`photoQuerySchema` valida o parametro no servidor.

`PhotosService` usa `photosOnAlbums` para encontrar as fotos do album.

`PhotosList` exibe somente os resultados recebidos.

O filtro nao e apenas visual: ele e salvo na URL, enviado para a API, validado e aplicado no banco antes de a lista ser renderizada.
