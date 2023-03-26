export function formatDate(date) {
  const dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  const newDate = new Date(date).toLocaleString('ru-RU', dateOptions);

  return newDate;
}
