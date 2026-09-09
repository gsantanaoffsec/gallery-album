# Resumo: `contexts`, `albums`, `photos` e `models`

## A ideia geral

Essa estrutura de pastas nao e uma exigencia do React. Ela e uma forma de organizar o projeto por areas de responsabilidade.

No projeto, a estrutura relacionada aos dados e:

```text
src
  contexts
    albums
      models
        album.ts
    photos
      models
        photo.ts
```

Cada pasta ajuda a responder uma pergunta: que parte do sistema este codigo representa?

## O que significa `contexts`?

Neste caso, `contexts` significa contextos do negocio. Nao e necessariamente o `Context` do React.

A pasta separa as areas principais da aplicacao. Atualmente existem:

```text
contexts/albums
contexts/photos
```

No futuro, poderiam existir outros contextos, como usuarios, autenticacao ou favoritos.

## O que significa `albums`?

`albums` representa tudo que estiver relacionado a albuns.

Dentro dele existe o modelo de album:

```text
src/contexts/albums/models/album.ts
```

O arquivo define:

```ts
export interface Album {
  id: string
  title: string
}
```

Isso significa que um objeto do tipo `Album` precisa ter um `id` e um `title`, ambos do tipo `string`.

## O que significa `photos`?

`photos` representa tudo que estiver relacionado a fotos.

Dentro dele existe o modelo de foto:

```text
src/contexts/photos/models/photo.ts
```

O arquivo define:

```ts
export interface Photo {
  id: string
  title: string
  imageId: string
  albums: Album[]
}
```

Uma foto possui um identificador, um titulo, um identificador de imagem e uma lista de albuns.

## O que significa `models`?

`models` guarda os formatos dos dados de cada contexto.

Por isso existe:

```text
albums/models/album.ts
photos/models/photo.ts
```

O modelo de album fica perto do contexto de albuns, e o modelo de foto fica perto do contexto de fotos.

## Por que `Photo` usa `Album[]`?

No arquivo `photo.ts`, existe esta importacao:

```ts
import type { Album } from '../../albums/models/album'
```

E a propriedade da foto e declarada assim:

```ts
albums: Album[]
```

`Album[]` significa uma lista de objetos do tipo `Album`.

Na pratica, uma foto pode estar associada a varios albuns:

```ts
const photo: Photo = {
  id: 'photo-1',
  title: 'Praia',
  imageId: 'praia.jpg',
  albums: [
    { id: 'album-1', title: 'Viagem' },
    { id: 'album-2', title: 'Natureza' },
  ],
}
```

Essa relacao aparece no componente de filtro de albuns quando o codigo acessa o titulo de cada album:

```tsx
{
  albums.map((album) => <Button key={album.id}>{album.title}</Button>)
}
```

O `album` usado nesse componente segue o formato definido em `Album`.

## Por que nao colocar todos os modelos em uma pasta unica?

Tambem seria possivel usar uma estrutura menor:

```text
src
  models
    album.ts
    photo.ts
```

Isso funcionaria. A organizacao por contexto apenas deixa mais claro a qual area cada arquivo pertence.

Conforme o projeto cresce, cada contexto pode reunir seus proprios arquivos:

```text
photos
  models
  services
  hooks
  components
  pages

albums
  models
  services
  hooks
  components
  pages
```

Assim, os modelos, servicos, hooks, componentes e paginas de fotos ficam agrupados, sem se misturar com os arquivos de albuns.

## Resumo final

`contexts` separa as areas do negocio.

`albums` representa a area de albuns.

`photos` representa a area de fotos.

`models` guarda os formatos dos dados.

`album.ts` define o formato de um album.

`photo.ts` define o formato de uma foto que pode estar relacionada a varios albuns.
