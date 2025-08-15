export interface IMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface OpenAIModel {
  id: string;
  name: string;
  description: string;
}