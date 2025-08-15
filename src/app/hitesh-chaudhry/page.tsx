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
    "JavaScript",
    "React.js",
    "Node.js",
    "Web Development",
    "Frontend",
    "Backend",
    "API Development",
    "MongoDB",
  ];

  const sampleQuestions = [
    "How do I get started with React?",
    "What's the difference between let, const, and var?",
    "How to build a REST API with Node.js?",
    "Best practices for JavaScript development?",
  ];


export default function HiteshChaudhryChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    setLoading(true)
    const userMessage: IMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response (you would replace this with actual AI integration)
    const response = await fetch("/api/ask-hitesh", {
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
    <Container maxWidth="lg" sx={{ 
      mt: { xs: 1, sm: 2 }, 
      mb: { xs: 2, sm: 4 },
      px: { xs: 1, sm: 2 }
    }}>
      {/* Header */}
      <Box sx={{ 
        display: "flex", 
        alignItems: { xs: "flex-start", sm: "center" },
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 2, sm: 0 },
        mb: 3 
      }}>
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <IconButton onClick={() => router.back()} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar
            sx={{
              width: { xs: 50, sm: 60 },
              height: { xs: 50, sm: 60 },
              bgcolor: "#4285f4",
              mr: 2,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            HC
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
            >
              Chat with Hitesh Choudhry
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <YouTubeIcon sx={{ fontSize: 16 }} />
              Web Development Educator & YouTuber
            </Typography>
          </Box>
        </Box>
        
        {/* Model Selection */}
        <FormControl size="small" sx={{ 
          minWidth: { xs: "100%", sm: 200 },
          width: { xs: "100%", sm: "auto" }
        }}>
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
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", lg: "row" },
        gap: 3, 
        height: { xs: "auto", lg: "calc(100vh - 300px)" },
        minHeight: { xs: "60vh", lg: "auto" }
      }}>
        {/* Chat Area */}
        <Box sx={{ 
          flex: 1, 
          display: "flex", 
          flexDirection: "column",
          minHeight: { xs: "60vh", lg: "auto" }
        }}>
          {/* Messages */}
          <Paper
            sx={{
              flex: 1,
              p: { xs: 1, sm: 2 },
              mb: 2,
              overflowY: "auto",
              bgcolor: "grey.50",
              minHeight: { xs: "50vh", lg: "auto" }
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    maxWidth: { xs: "85%", sm: "70%" },
                    bgcolor: message.role === "user" ? "primary.main" : "white",
                    color: message.role === "user" ? "white" : "text.primary",
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {message.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.7,
                      display: "block",
                      mt: 1,
                      fontSize: { xs: "0.7rem", sm: "0.75rem" }
                    }}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Paper>

          {/* Input Area */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" },
            gap: 1 
          }}>
            <TextField
              fullWidth
              placeholder="Ask Hitesh about web development, JavaScript, React..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
              multiline
              maxRows={3}
              size="small"
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              sx={{ 
                minWidth: { xs: "100%", sm: 56 },
                height: { xs: "40px", sm: "auto" }
              }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>

        {/* Sample Questions Sidebar */}
        <Card sx={{ 
          width: { xs: "100%", lg: 300 }, 
          height: "fit-content",
          order: { xs: -1, lg: 0 }
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom>
              Sample Questions
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Try asking these questions to get started:
            </Typography>
            <Box sx={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: 1,
              maxHeight: { xs: "200px", lg: "none" },
              overflowY: { xs: "auto", lg: "visible" }
            }}>
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
                  onClick={() => handleQuestionClick(question)}
                  sx={{
                    textAlign: "left",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontSize: { xs: "0.8rem", sm: "0.875rem" }
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
