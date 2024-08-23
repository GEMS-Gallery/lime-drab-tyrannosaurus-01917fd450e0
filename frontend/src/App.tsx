import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Container, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { backend } from 'declarations/backend';
import DocumentEditor from './components/DocumentEditor';
import DocumentList from './components/DocumentList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2eaadc',
    },
    secondary: {
      main: '#e16259',
    },
    background: {
      default: '#f7f6f3',
    },
  },
});

function App() {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const rootDocs = await backend.getChildDocuments('');
      setDocuments(rootDocs);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleCreateDocument = async () => {
    try {
      const newDocId = await backend.createDocument('New Document', '', null);
      fetchDocuments();
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notion Clone
          </Typography>
          <Button color="inherit" startIcon={<AddIcon />} onClick={handleCreateDocument}>
            New Document
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <DocumentList documents={documents} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Routes>
              <Route path="/" element={<Typography variant="h4">Select a document to edit</Typography>} />
              <Route path="/document/:id" element={<DocumentEditor />} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
