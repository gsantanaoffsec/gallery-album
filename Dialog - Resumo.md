# Dialog - Resumo

## Visão geral

A implementação adiciona um componente de diálogo/modal baseado em `@radix-ui/react-dialog` e integra esse modal ao `App`.

Os três arquivos principais têm estas responsabilidades:

- `dialog.tsx`: cria os componentes reutilizáveis do diálogo.
- `App.tsx`: demonstra a abertura do modal, seu conteúdo e suas ações.
- `index.css`: importa as animações utilizadas pelas classes do modal e mantém o tema global do Tailwind.

Além deles, o projeto passou a utilizar:

- `@radix-ui/react-dialog`: comportamento acessível e controle do diálogo.
- `tw-animate-css`: classes utilitárias para entrada, saída, fade e slide.

## Fluxo completo

```text
Usuário clica em "Abrir modal"
        ↓
DialogTrigger altera o estado do Dialog.Root
        ↓
DialogContent é renderizado através de um Portal
        ↓
Overlay escurece e desfoca o restante da página
        ↓
Usuário interage com cabeçalho, upload e rodapé
        ↓
DialogClose fecha o modal ao clicar no X ou em "Cancelar"
```

## `dialog.tsx`

O arquivo encapsula as primitivas do Radix em componentes que seguem o padrão visual do projeto.

### `Dialog`

```ts
export const Dialog = DialogPrimitive.Root
```

É o componente raiz. Ele controla o estado aberto/fechado e agrupa todas as partes do diálogo.

### `DialogTrigger`

```ts
export const DialogTrigger = DialogPrimitive.Trigger
```

É o elemento responsável por abrir o modal. No `App`, ele recebe `asChild`, permitindo que um componente `Button` seja usado diretamente como gatilho.

### `DialogClose`

```ts
export const DialogClose = DialogPrimitive.Close
```

Fecha o modal quando é acionado. Ele também é usado com `asChild` para transformar o botão de cancelar e o botão com o ícone X em controles de fechamento.

### `DialogOverlay`

Esse componente representa a camada atrás do modal:

- `fixed inset-0`: cobre toda a janela.
- `z-50`: mantém o overlay acima do conteúdo normal.
- `bg-background-secondary/60`: aplica uma camada escura semitransparente.
- `backdrop-blur-sm`: desfoca o fundo.
- Classes `data-[state=open]` e `data-[state=closed]`: controlam as animações conforme o estado do Radix.

As classes podem ser complementadas ou substituídas usando a prop `className`, combinada com `classnames` através da função `cn`.

### `DialogContent`

Esse é o conteúdo visual do modal. Ele usa:

```tsx
<DialogPrimitive.Portal>
  <DialogOverlay />
  <DialogPrimitive.Content>...</DialogPrimitive.Content>
</DialogPrimitive.Portal>
```

O `Portal` renderiza o diálogo fora da hierarquia visual normal da página, facilitando o controle de camadas e posicionamento.

O conteúdo é centralizado com:

- `fixed left-[50%] top-[50%]`.
- `translate-x-[-50%] translate-y-[-50%]`.
- `w-full max-w-[32rem]` para limitar a largura.
- `z-[60]` para ficar acima do overlay.

O conteúdo também é envolvido pelo componente `Card` existente:

```tsx
<Card size="lg" variant="primary">
  {children}
</Card>
```

Assim, o modal reutiliza o padrão visual de cartões já presente no projeto.

### `DialogHeader`

O cabeçalho organiza:

- O título do modal com `DialogPrimitive.Title`.
- O botão de fechar com o ícone `XIcon`.
- Um `Divider` abaixo do título.

O texto recebido como `children` é renderizado através do componente `Text` com a variante `heading-medium`.

### `DialogBody`

É um contêiner simples para o conteúdo principal do modal. Ele permite manter uma estrutura semântica clara entre cabeçalho, corpo e rodapé.

### `DialogFooter`

O rodapé adiciona:

- Um `Divider` acima das ações.
- Um `footer` com os botões alinhados à direita.
- Espaçamento entre os botões através de `gap-3`.

## `App.tsx`

O `App` importa os componentes do diálogo e adiciona uma demonstração após o campo de upload.

### Abertura do modal

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir modal</Button>
  </DialogTrigger>
  ...
</Dialog>
```

O botão `Abrir modal` funciona como gatilho sem precisar controlar manualmente um estado com `useState`. O Radix gerencia esse estado internamente.

### Conteúdo do modal

```tsx
<DialogContent>
  <DialogHeader>Teste dialog</DialogHeader>
  <DialogBody>...</DialogBody>
  <DialogFooter>...</DialogFooter>
</DialogContent>
```

O conteúdo é dividido em três partes, o que deixa a estrutura previsível e reutilizável:

1. Cabeçalho com título e fechamento.
2. Corpo com texto e upload.
3. Rodapé com as ações do modal.

### Upload dentro do modal

O mesmo `InputSingleFile` usado na página também é renderizado dentro do `DialogBody`:

```tsx
<InputSingleFile
  form={form}
  allowedExtensions={['png', 'jpg', 'jpeg', 'webp']}
  maxFileSizeInMb={50}
  replaceBy={<ImageFilePreview src={fileSource} alt="Imagem" />}
  {...form.register('file')}
/>
```

Ele usa o mesmo objeto `form`, o mesmo campo `file`, a mesma validação e a mesma prévia de imagem. Portanto, o upload externo e o upload do modal compartilham o estado do formulário.

### Ações do rodapé

O botão `Cancelar` é envolvido por `DialogClose`:

```tsx
<DialogClose asChild>
  <Button variant="secondary">Cancelar</Button>
</DialogClose>
```

Clicar nele fecha o modal automaticamente. Já o botão `Adicionar` está presente como ação visual, mas ainda não possui lógica de envio ou confirmação associada.

## `index.css`

A principal alteração funcional foi adicionar:

```css
@import 'tw-animate-css';
```

Esse pacote disponibiliza classes como:

- `animate-in` e `animate-out`.
- `fade-in-0` e `fade-out-0`.
- `slide-in-from-bottom-[48%]`.
- `slide-out-to-bottom-[48%]`.

Essas classes são aplicadas em `DialogOverlay` e `DialogContent` usando os atributos de estado fornecidos pelo Radix.

O restante da alteração no arquivo é principalmente de formatação: aspas simples e indentação foram padronizadas. O tema de cores e a fonte `Mulish` continuam definidos no bloco `@theme`.

## Relação entre os arquivos

`App.tsx` compõe o modal usando os componentes exportados por `dialog.tsx`.

`dialog.tsx` usa as primitivas de comportamento do Radix, os componentes visuais já existentes (`Card`, `Divider`, `Text`, `ButtonIcon`) e as classes globais disponíveis pelo `index.css`.

`index.css` habilita as classes de animação que dão movimento ao overlay e ao conteúdo do modal.

O resultado é uma composição em camadas:

```text
App
 └── Dialog.Root
      ├── Dialog.Trigger
      └── Dialog.Content
           ├── Dialog.Overlay
           └── Card
                ├── Dialog.Header
                ├── Dialog.Body
                └── Dialog.Footer
```

## Pontos de atenção

- O botão `Adicionar` ainda não executa uma ação; ele apenas aparece no rodapé.
- O mesmo campo `file` é registrado duas vezes no `App`, uma fora e outra dentro do modal. Isso pode gerar comportamento inesperado, pois os dois inputs compartilham o mesmo estado.
- Há classes que merecem revisão em `DialogContent`: `animate-n` parece ser um possível erro de digitação de `animate-in`, e `data=[state-closed]:fade-out-0` parece deveria ser `data-[state=closed]:fade-out-0`.
- O `App` importa `DialogClose` e `DialogTrigger` diretamente do Radix, enquanto `dialog.tsx` também os exporta. Para manter uma API única, seria possível importar todas as partes do arquivo local `dialog.tsx`.
