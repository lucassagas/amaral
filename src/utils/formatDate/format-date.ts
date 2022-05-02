export const formatDate = (date: Date | string) =>
  new Intl.DateTimeFormat('pt-br', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(date))
