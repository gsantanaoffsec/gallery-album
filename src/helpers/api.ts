// Importa a funcao principal do Axios e, separadamente, o tipo usado para configurar uma requisicao.
import axios, { type AxiosRequestConfig } from 'axios'

// Cria uma instancia reutilizavel do Axios para concentrar as configuracoes da API.
export const api = axios.create({
  // Define a URL base que sera usada no inicio de todas as requisicoes dessa instancia.
  // O valor vem da variavel de ambiente VITE_API_URL configurada pelo Vite.
  baseURL: import.meta.env.VITE_API_URL,
})

// Declara uma funcao que recebe o caminho da URL e, opcionalmente, configuracoes do Axios.
export const fetcher = (url: string, options: AxiosRequestConfig = {}) =>
  // Faz uma requisicao HTTP do tipo GET usando a URL e as configuracoes recebidas.
  api.get(url, options).then((res) => res.data)
// Quando a requisicao termina, retorna somente o corpo da resposta, ignorando os metadados do Axios.
