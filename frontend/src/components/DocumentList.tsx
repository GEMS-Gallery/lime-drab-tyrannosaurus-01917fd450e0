import React from 'react';
import { List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

interface Document {
  id: string;
  title: string;
}

interface DocumentListProps {
  documents: Document[];
}

function DocumentList({ documents }: DocumentListProps) {
  return (
    <Paper elevation={3}>
      <List>
        {documents.map((doc) => (
          <ListItem key={doc.id} component={Link} to={`/document/${doc.id}`}>
            <ListItemText primary={doc.title} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default DocumentList;
