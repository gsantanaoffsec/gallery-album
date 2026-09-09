# Resumo: `map`, `_` e `index`

## Onde isso aparece no projeto

No arquivo `src/contexts/albums/components/albums-filter.tsx`, os albuns recebidos pela prop `albums` sao transformados em botoes:

```tsx
{
  albums.map((album) => (
    <Button key={album.id} size="sm" className="cursor-pointer" variant="ghost">
      {album.title}
    </Button>
  ))
}
```

Nesse caso, o `map` percorre cada objeto `album` e cria um componente `Button` para ele.

## Os parametros do `map`

O `map` pode receber uma funcao com dois parametros principais:

```tsx
array.map((valor, index) => {
  // codigo executado para cada item
})
```

O primeiro parametro e o valor atual do array.

O segundo parametro e a posicao desse valor no array.

No codigo real do projeto, apenas o primeiro parametro e necessario:

```tsx
albums.map((album) => <Button key={album.id}>{album.title}</Button>)
```

`album` representa o item atual e permite acessar `album.id` e `album.title`.

## Por que usar `_`?

No carregamento dos Skeletons, o codigo usa:

```tsx
Array.from({ length: 5 }).map((_, index) => (
  <Skeleton className="w-28 h-7" key={`album-loading-${index}`} />
))
```

O primeiro parametro do `map` representa o valor atual do array. Nesse caso, esse valor nao interessa, porque o array foi criado apenas para gerar cinco repeticoes.

Por convencao, usamos `_` para deixar claro que o parametro existe, mas nao sera utilizado:

```tsx
;(_, index)
```

O underline nao tem um significado especial para o JavaScript. Ele e apenas um nome de variavel usado pela equipe para indicar que aquele valor sera ignorado.

## Para que serve o `index`?

O `index` informa a posicao atual do item. No componente real, ele e usado para criar uma `key` exclusiva para cada Skeleton:

```tsx
key={`album-loading-${index}`}
```

As keys geradas ficam parecidas com estas:

```text
album-loading-0
album-loading-1
album-loading-2
album-loading-3
album-loading-4
```

O React usa a `key` para identificar cada elemento de uma lista e entender qual item foi adicionado, removido ou alterado.

## Resumo pratico

```tsx
map((valor, index) => ...)
```

`valor` representa o item atual.

`index` representa a posicao atual.

```tsx
map((_, index) => ...)
```

`_` significa que o valor atual nao sera usado.

`index` continua sendo usado, neste caso, para criar uma `key` diferente para cada Skeleton.
