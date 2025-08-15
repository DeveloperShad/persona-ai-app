'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';

interface CreatePersonaDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (persona: PersonaData) => void;
}

interface PersonaData {
  name: string;
  description: string;
  personality: string;
  expertise: string[];
}

const CreatePersonaDialog: React.FC<CreatePersonaDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<PersonaData>({
    name: '',
    description: '',
    personality: '',
    expertise: [],
  });

  const [expertiseInput, setExpertiseInput] = useState('');

  const personalities = [
    'Friendly & Helpful',
    'Professional & Formal',
    'Creative & Imaginative',
    'Analytical & Logical',
    'Casual & Conversational',
  ];

  const handleAddExpertise = () => {
    if (expertiseInput.trim() && !formData.expertise.includes(expertiseInput.trim())) {
      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, expertiseInput.trim()]
      }));
      setExpertiseInput('');
    }
  };

  const handleRemoveExpertise = (expertise: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter(e => e !== expertise)
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.description && formData.personality) {
      onSubmit(formData);
      setFormData({ name: '', description: '', personality: '', expertise: [] });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PersonAddIcon />
        Create New Persona
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          <TextField
            label="Persona Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            fullWidth
            required
            placeholder="e.g., Dr. Sarah, Chef Marco, Coach Alex"
          />
          
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            fullWidth
            multiline
            rows={3}
            required
            placeholder="Describe what this persona does and their background..."
          />

          <FormControl fullWidth required>
            <InputLabel>Personality Type</InputLabel>
            <Select
              value={formData.personality}
              onChange={(e) => setFormData(prev => ({ ...prev, personality: e.target.value }))}
              label="Personality Type"
            >
              {personalities.map((personality) => (
                <MenuItem key={personality} value={personality}>
                  {personality}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Areas of Expertise
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                placeholder="Add expertise area"
                size="small"
                onKeyPress={(e) => e.key === 'Enter' && handleAddExpertise()}
              />
              <Button onClick={handleAddExpertise} variant="outlined" size="small">
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.expertise.map((expertise) => (
                <Chip
                  key={expertise}
                  label={expertise}
                  onDelete={() => handleRemoveExpertise(expertise)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!formData.name || !formData.description || !formData.personality}
        >
          Create Persona
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePersonaDialog;
