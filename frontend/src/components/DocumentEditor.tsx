import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { backend } from 'declarations/backend';

function DocumentEditor() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchDocument(id);
    }
  }, [id]);

  const fetchDocument = async (docId: string) => {
    try {
      setLoading(true);
      const doc = await backend.getDocument(docId);
      if (doc) {
        setTitle(doc.title);
        setContent(doc.content);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (id) {
      try {
        setLoading(true);
        await backend.updateDocument(id, title, content);
      } catch (error) {
        console.error('Error updating document:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </Paper>
  );
}

export default DocumentEditor;
