/** dd.mm.yyyy -> Date */
export function parseDate(dateString: string) {
  const [day, month, year] = dateString.split(".");
  return new Date(Number(year), Number(month) - 1, Number(day)); // Создаем объект Date, месяц -1, так как месяцы начинаются с 0
}

/** Date -> dd.mm.yyyy */
export function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
