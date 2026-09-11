# Resumo: `Array.from({ length: 5 })` e `Skeleton`

## Onde isso aparece no projeto

No arquivo `src/contexts/albums/components/albums-filter.tsx`, o componente mostra botoes reais ou Skeletons, dependendo do valor de `loading`:

```tsx
{
  !loading ? (
    <>
      <Button size="sm" className="cursor-pointer" variant="primary">
        Todos
      </Button>
      {albums.map((album) => (
        <Button
          key={album.id}
          size="sm"
          className="cursor-pointer"
          variant="ghost"
        >
          {album.title}
        </Button>
      ))}
    </>
  ) : (
    Array.from({ length: 5 }).map((_, index) => (
      <Skeleton className="w-28 h-7" key={`album-loading-${index}`} />
    ))
  )
}
```

## O que `Array.from` faz

```tsx
Array.from({ length: 5 })
```

Esse comando cria um array com cinco posicoes. Como o objetivo nao e guardar dados, os valores dessas posicoes nao sao importantes.

Podemos imaginar o resultado assim:

```ts
;[undefined, undefined, undefined, undefined, undefined]
```

O importante e que o array possui cinco posicoes para que o `map` seja executado cinco vezes.

## Por que criar cinco Skeletons?

Depois de criar o array, o componente percorre suas posicoes:

```tsx
Array.from({ length: 5 }).map((_, index) => (
  <Skeleton className="w-28 h-7" key={`album-loading-${index}`} />
))
```

A cada repeticao, um `Skeleton` e criado. Portanto, o usuario ve cinco espacos temporarios enquanto os albuns ainda estao sendo carregados.

O numero `5` nao significa que existam exatamente cinco albuns. Ele define apenas quantos placeholders serao exibidos durante o carregamento.

## O papel do `loading`

Quando `loading` e `false`, aparecem o botao `Todos` e os albuns reais:

```tsx
{
  albums.map((album) => <Button key={album.id}>{album.title}</Button>)
}
```

Quando `loading` e `true`, aparecem cinco Skeletons:

```tsx
Array.from({ length: 5 }).map((_, index) => (
  <Skeleton className="w-28 h-7" key={`album-loading-${index}`} />
))
```

Essa troca evita que a area fique vazia e ajuda a manter o formato da interface enquanto os dados chegam.

## Por que usar `map` nesse array?

O `map` permite transformar cada uma das cinco posicoes em um componente React.

O primeiro parametro foi chamado de `_` porque o valor atual nao e utilizado.

O segundo parametro e `index`, usado para criar uma `key` diferente para cada Skeleton:

```tsx
key={`album-loading-${index}`}
```

## Outra forma de escrever

O mesmo resultado pode ser obtido passando a funcao diretamente para `Array.from`:

```tsx
Array.from({ length: 5 }, (_, index) => (
  <Skeleton className="w-28 h-7" key={`album-loading-${index}`} />
))
```

As duas formas criam cinco Skeletons. A diferenca e apenas onde a funcao de repeticao e passada.
