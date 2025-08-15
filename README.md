# Persona AI App

A Next.js application for interacting with AI personas. Users can ask questions to different personas and receive AI-generated responses with customizable OpenAI models.

## Features

- **Multiple AI Personas**: Chat with Hitesh Chaudhry and Piyush Garg personas
- **OpenAI Model Selection**: Choose from GPT-4o, GPT-4o Mini, GPT-4 Turbo, or GPT-3.5 Turbo
- **Real-time Chat Interface**: Interactive conversation with message history
- **Persona-specific Responses**: Each AI persona has unique characteristics and expertise
- **Modern UI**: Built with Material-UI and TypeScript for a polished experience

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DeveloperShad/persona-ai-app.git
cd persona-ai-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
  app/                 # Next.js app directory
    api/               # API routes for personas
      ask-hitesh/      # Hitesh Chaudhry API endpoint
      ask-piyush/      # Piyush Garg API endpoint
    hitesh-chaudhry/   # Hitesh persona chat page
    piyush-garg/       # Piyush persona chat page
  components/          # Reusable UI components
    CreatePersonaDialog.tsx
    Loader.tsx
  constants/           # System prompts for personas
    system-prompts.ts
  types/               # TypeScript type definitions
    types.ts
```

## How to Use

1. **Select a Persona**: Choose between Hitesh Chaudhry or Piyush Garg from the main page
2. **Choose AI Model**: Use the dropdown in the top-right corner to select your preferred OpenAI model:
   - **GPT-4o**: Most capable model, best for complex tasks
   - **GPT-4o Mini**: Faster and more cost-effective
   - **GPT-4 Turbo**: High performance with good speed
   - **GPT-3.5 Turbo**: Fast and efficient for most tasks
3. **Start Chatting**: Type your questions or click on sample questions to begin the conversation
4. **View Expertise**: See each persona's areas of expertise displayed as tags

## Customization

### Adding New Personas
1. Create a new folder in `src/app/` (e.g., `new-persona/`)
2. Add a `page.tsx` file following the existing pattern
3. Create a corresponding API route in `src/app/api/ask-new-persona/`
4. Add the persona's system prompt to `src/constants/system-prompts.ts`

### Modifying System Prompts
Update the prompts in `src/constants/system-prompts.ts` to customize persona behavior and expertise.

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Material-UI**: Component library for React
- **OpenAI API**: AI-powered responses
- **React**: UI library

## License

MIT
