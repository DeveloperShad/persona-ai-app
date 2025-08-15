export interface IMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}