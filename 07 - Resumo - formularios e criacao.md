# Resumo: formularios e criacao de fotos e albuns

Este e o resumo das alteracoes mais recentes ate o commit atual. O codigo ainda pode continuar sendo desenvolvido.

## 1. Validacao dos formularios

Os formularios passaram a usar `react-hook-form` com tipos do TypeScript e `zodResolver`.

O Zod define as regras:

- titulo obrigatorio, com no maximo 255 caracteres;
- arquivo obrigatorio;
- IDs de albuns ou fotos como listas opcionais de UUIDs.

O `form.handleSubmit` so chama o envio quando os dados passam pela validacao. Os erros ficam em `form.formState.errors` e sao enviados para os componentes exibirem.

## 2. Criacao de uma foto

O formulario de nova foto agora:

- registra o titulo e o arquivo;
- mostra mensagens de erro;
- observa o arquivo selecionado;
- cria uma URL temporaria para a pre-visualizacao;
- permite selecionar albuns;
- destaca visualmente os albuns escolhidos;
- mostra estado de carregamento enquanto salva.

A selecao usa um `Set` para adicionar ou remover IDs sem duplicacao. Como o campo e opcional, ele pode comecar como uma lista vazia.

## 3. Envio da foto para a API

O hook `usePhoto` passou a criar a foto em etapas:

1. envia o titulo para criar o registro;
2. envia o primeiro arquivo para `/photos/:id/image` usando `multipart/form-data`;
3. atualiza a consulta da lista de fotos;
4. associa a foto aos albuns selecionados;
5. mostra uma mensagem de sucesso ou erro.

Depois do envio, o dialog e fechado e os botoes ficam bloqueados durante a operacao.

## 4. Criacao de um album

O formulario de novo album:

- valida o titulo;
- busca as fotos cadastradas;
- mostra skeletons enquanto as fotos carregam;
- mostra uma mensagem quando nao existem fotos;
- permite selecionar e remover fotos;
- envia os IDs selecionados no formulario.

A selecao de fotos tambem usa uma lista de IDs e atualiza o estado do React Hook Form.

## 5. Conceitos principais

- `register`: conecta um input ao formulario.
- `watch`: observa um valor e atualiza a interface quando ele muda.
- `getValues`: le o valor atual sem necessariamente observar mudancas.
- `setValue`: altera um campo manualmente.
- `reset`: limpa os valores do formulario.
- `zodResolver`: faz o React Hook Form usar as regras do Zod.
- `formState.errors`: contem os erros de validacao.
- `useTransition`: informa que uma operacao de envio esta em andamento.

## Estado atual

O ultimo commit inclui o fluxo de validacao, selecao e criacao pela API. O desenvolvimento ainda nao foi finalizado, portanto novas alteracoes podem ser acrescentadas depois deste resumo.
