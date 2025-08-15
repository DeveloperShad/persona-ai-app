import { OpenAIModel } from "@/types/types";

export const OPENAI_MODELS: OpenAIModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "Most capable model, best for complex tasks"
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    description: "Faster and more cost-effective"
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "High performance with good speed"
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "Fast and efficient for most tasks"
  }
];
