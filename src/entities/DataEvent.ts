export default interface DataEvent {
  timestamp: number;
  type: "start" | "span" | "data" | "stop";
  select?: Array<string>;
  group?: Array<string>;
  [key: string]: any;
}
