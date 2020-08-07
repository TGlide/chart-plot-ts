export function isChartError(obj: any): obj is ChartError {
  return obj && "message" in obj && typeof obj.message === "string";
}

export default interface ChartError {
  message: string;
}
