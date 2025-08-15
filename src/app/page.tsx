'use client';
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Chat as ChatIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const educators = [
    {
      name: 'Hitesh Choudhry',
      description: 'Popular YouTuber and educator specializing in web development, JavaScript, React, and programming tutorials. Known for his clear explanations and practical coding approach.',
      role: 'Web Development Educator',
      chatRoute: '/hitesh-chaudhry',
      bgColor: '#4285f4',
    },
    {
      name: 'Piyush Garg',
      description: 'Tech educator and YouTuber focused on full-stack development, DevOps, and modern web technologies. Creates comprehensive programming courses and tutorials.',
      role: 'Full-Stack Developer & Educator',
      chatRoute: '/piyush-garg',
      bgColor: '#ea4335',
    },
  ];

  const handleChatRedirect = (route: string) => {
    router.push(route);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom>
          Chat with AI Avatars
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Interact with AI personas of your favorite educators and YouTubers
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Experience personalized learning through AI-powered conversations
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 4,
          mb: 8
        }}
      >
        {educators.map((educator) => (
          <Card 
            key={educator.name}
            elevation={3} 
            sx={{ 
              height: '100%',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ mb: 3 }}>
                <Avatar
                  alt={educator.name}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: educator.bgColor,
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {educator.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Typography variant="h4" component="h2" gutterBottom>
                  {educator.name}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  color="primary" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <YouTubeIcon sx={{ fontSize: 20 }} />
                  {educator.role}
                </Typography>
              </Box>

              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  mb: 4,
                  lineHeight: 1.6,
                  textAlign: 'left'
                }}
              >
                {educator.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button 
                  variant="contained" 
                  size="large"
                  startIcon={<ChatIcon />}
                  onClick={() => handleChatRedirect(educator.chatRoute)}
                  sx={{
                    bgcolor: educator.bgColor,
                    '&:hover': {
                      bgcolor: educator.bgColor,
                      filter: 'brightness(0.9)',
                    },
                    px: 3,
                    py: 1.5,
                  }}
                >
                  Chat with {educator.name.split(' ')[0]}
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box 
        sx={{ 
          textAlign: 'center',
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant="h5" gutterBottom>
          How it works
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Click on any educator&apos;s card to start a conversation with their AI avatar. 
          Get personalized learning advice, ask coding questions, or discuss technology trends.
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 4,
            flexWrap: 'wrap'
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="primary">🤖</Typography>
            <Typography variant="body2">AI-Powered</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="primary">💬</Typography>
            <Typography variant="body2">Interactive Chat</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="primary">📚</Typography>
            <Typography variant="body2">Educational</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
