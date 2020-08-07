export function timestampToString(timestamp: string | number): string {
  const h = new Date(timestamp).getHours();
  const m = new Date(timestamp).getMinutes();

  const hours = h < 10 ? "0" + h : h;
  const minutes = m < 10 ? "0" + m : m;

  return hours + ":" + minutes;
}
