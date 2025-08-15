"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
  TextField,
  Paper,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
  YouTube as YouTubeIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";
import { IMessage } from "@/types/types";
import { OPENAI_MODELS } from "@/constants/openai-models";

const expertise = [
  "Full-Stack Development",
  "DevOps",
  "Docker",
  "Kubernetes",
  "AWS",
  "React.js",
  "Node.js",
  "Python",
  "System Design",
];

const sampleQuestions = [
  "How to get started with DevOps?",
  "What's the best way to learn full-stack development?",
  "How to deploy applications using Docker?",
  "System design principles for beginners?",
];

export default function PiyushGargChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    setLoading(true);
    const userMessage: IMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response (you would replace this with actual AI integration)
    setTimeout(() => {}, 1000);
    const response = await fetch("/api/ask-piyush", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: inputMessage,
        history: messages,
        model: selectedModel,
      }),
    });
    const data = await response.json();
    const aiResponse: IMessage = {
      id: (Date.now() + 1).toString(),
      content: data.reply,
      role: "assistant",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiResponse]);

    setInputMessage("");
    setLoading(false);
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  return (
    <>
    {loading && <Loader />}
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton onClick={() => router.back()} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Avatar
          sx={{
            width: 60,
            height: 60,
            bgcolor: "#ea4335",
            mr: 2,
            fontSize: "1.5rem",
          }}
        >
          PG
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component="h1">
            Chat with Piyush Garg
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <YouTubeIcon sx={{ fontSize: 16 }} />
            Full-Stack Developer & DevOps Educator
          </Typography>
        </Box>
        
        {/* Model Selection */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>AI Model</InputLabel>
          <Select
            value={selectedModel}
            label="AI Model"
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            {OPENAI_MODELS.map((model) => (
              <MenuItem key={model.id} value={model.id}>
                <Box>
                  <Typography variant="body2">{model.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {model.description}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Expertise Tags */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Expertise:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {expertise.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              color="secondary"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 3, height: "calc(100vh - 300px)" }}>
        {/* Chat Area */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Messages */}
          <Paper
            sx={{
              flex: 1,
              p: 2,
              mb: 2,
              overflowY: "auto",
              bgcolor: "grey.50",
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.role === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: "70%",
                    bgcolor:
                      message.role === "user" ? "secondary.main" : "white",
                    color: message.role === "user" ? "white" : "text.primary",
                  }}
                >
                  <Typography variant="body1">{message.content}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.7,
                      display: "block",
                      mt: 1,
                    }}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Paper>

          {/* Input Area */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Ask Piyush about full-stack development, DevOps, system design..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              multiline
              maxRows={3}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              sx={{ minWidth: 56 }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>

        {/* Sample Questions Sidebar */}
        <Card sx={{ width: 300, height: "fit-content" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sample Questions
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try asking these questions to get started:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => handleQuestionClick(question)}
                  sx={{
                    textAlign: "left",
                    justifyContent: "flex-start",
                    textTransform: "none",
                  }}
                >
                  {question}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
    </>
  );
}
