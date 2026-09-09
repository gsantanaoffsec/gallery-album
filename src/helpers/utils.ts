// Cria uma versão da função que só executa depois de um período sem novas chamadas.
// T representa a função original e Parameters<T> preserva os tipos dos seus argumentos.

export function debounce<T extends (...args: any[]) => any>(
  // Função original, executada somente após o tempo de espera.
  func: T,
  // Tempo, em milissegundos, que deve passar sem novas chamadas.
  wait: number,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>): void {
    // Guarda a execução mais recente e permite que ela use os argumentos atuais.
    const later = () => {
      timeout = null
      func(...args)
    }

    // Uma nova chamada reinicia a contagem; a função só executa após a pausa.
    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)
  }
}
