# Image File Preview - Resumo

## Visão geral

A implementação adiciona uma prévia da imagem selecionada no upload. O fluxo envolve quatro arquivos:

- `App.tsx`: observa o arquivo e cria a URL temporária da imagem.
- `input-single-file.tsx`: valida o arquivo e decide qual conteúdo renderizar.
- `image-file-preview.tsx`: encapsula a estrutura visual da prévia.
- `image-file-preview.variants.tsx`: concentra as classes visuais do contêiner e da imagem.

## Fluxo completo

```text
Usuário seleciona um arquivo
        ↓
React Hook Form atualiza o campo "file"
        ↓
App observa o campo e cria uma URL temporária
        ↓
App passa a URL para ImageFilePreview
        ↓
InputSingleFile valida extensão e tamanho
        ↓
Se o arquivo for válido, renderiza replaceBy
        ↓
ImageFilePreview exibe a imagem
```

## `App.tsx`

O formulário é criado com `useForm` e o campo `file` é observado:

```tsx
const file = form.watch('file')
const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined
```

- `file` representa o `FileList` produzido pelo input.
- `file?.[0]` obtém o primeiro arquivo selecionado.
- `URL.createObjectURL` cria uma URL temporária para o navegador conseguir exibir a imagem.

A prévia é passada para o componente de upload:

```tsx
replaceBy={<ImageFilePreview src={fileSource} alt="Imagem" />}
```

O `App` fornece o conteúdo da prévia, mas não precisa conhecer a lógica interna do upload.

## `input-single-file.tsx`

O componente recebeu a prop:

```ts
replaceBy: React.ReactNode
```

Isso permite que qualquer conteúdo renderizável pelo React seja usado como substituição do seletor de arquivos.

O componente:

1. Obtém o arquivo através do React Hook Form.
2. Extrai sua extensão e seu tamanho.
3. Valida a extensão permitida.
4. Valida o tamanho máximo.
5. Mostra o seletor e os erros quando o arquivo é inválido.
6. Renderiza `replaceBy` e os dados do arquivo quando ele é válido.

A decisão principal é:

```tsx
{!formFile || !isValidFile() ? (
  // seletor de arquivo e mensagens de erro
) : (
  // replaceBy, nome do arquivo e botão Remover
)}
```

O componente fica reutilizável porque não precisa saber como a prévia deve ser apresentada. Quem o utiliza define isso por meio de `replaceBy`.

## `image-file-preview.tsx`

Esse componente encapsula a estrutura visual da prévia:

```tsx
<div className={...}>
  <img className={...} {...props} />
</div>
```

Ele herda as propriedades normais de uma imagem com:

```ts
React.ComponentProps<'img'>
```

Por isso aceita `src`, `alt`, `width`, `height`, eventos e outras propriedades de `<img>`.

Também possui a prop própria `imageClassName`:

- `className`: aplicado ao contêiner externo.
- `imageClassName`: aplicado ao elemento `<img>`.

Essa separação permite estilizar o contêiner e a imagem de forma independente.

## `image-file-preview.variants.tsx`

As classes são organizadas com `tailwind-variants` em duas funções:

### `imageFilePreviewVariants`

Aplica ao contêiner:

- `rounded-lg`: bordas arredondadas.
- `overflow-hidden`: corta o conteúdo que ultrapassar os limites do contêiner.

### `imageFilePreviewImageVariants`

Aplica à imagem:

- `w-full h-full`: ocupa todo o espaço disponível.
- `object-cover`: preenche o contêiner mantendo a proporção, podendo cortar parte da imagem.

## Relação entre os componentes

`App` conhece o formulário e fornece a URL da imagem.

`InputSingleFile` conhece as regras do upload e controla os estados válido e inválido.

`ImageFilePreview` conhece apenas a estrutura visual da prévia.

`image-file-preview.variants.tsx` mantém as classes visuais separadas da lógica do componente.

Essa divisão segue uma responsabilidade clara: o upload controla validação e estado, enquanto a prévia controla apenas apresentação.

## Ponto de atenção

Atualmente, `URL.createObjectURL(file[0])` é chamado diretamente durante a renderização do `App`. O ideal é criar e liberar essa URL com um efeito ou outra estratégia controlada, chamando `URL.revokeObjectURL` quando o arquivo mudar ou o componente for desmontado. Isso evita o acúmulo de URLs temporárias na memória.
