import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Chip, Box, Accordion, AccordionDetails, AccordionSummary, Container, Grid, CircularProgress } from '@mui/material';
import { ExpandMore } from '@mui/icons-material'

export default function RecipeCard({ recipe }) {

  const [brews, setBrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('/brews.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBrews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // The empty array means this runs only once when the component mounts

  // Show a loading spinner while fetching
  if (loading) {
    return (
      <Box display="flex" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  // Show an error message if the fetch fails
  if (error) {
    return (
      <Typography color="error" align="center" mt={5}>
        Error loading brews: {error}
      </Typography>
    );
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {recipe.name}
          </Typography>
        </Box>
        
        <Typography color="text.secondary">
          {recipe.style}
        </Typography>
        
        <Box>
          <Typography variant="caption" fontWeight="medium">
            {recipe.flavor_text}
          </Typography>
        </Box>

        <Typography variant="body2">
          {recipe.description}
        </Typography>
      </CardContent>
      
      <CardActions>
        {brews.map((brew) => (
          <Grid key={brew.id}>
            {BrewAccordian(brew, recipe)}
          </Grid>
        ))}
      </CardActions>
    </Card>
  );
}

export function BrewAccordian( brew, recipe ) {
  if (brew.id == recipe.id) {
    return(
      <Accordion sx={{ width: '100%' }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`${brew.id}-content`}
            id={`${brew.id}-accordion-header`}
          >
            <Typography component="span">Brews Using This Recipe</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {}
            </Typography>
          </AccordionDetails>
        </Accordion>
    );
  }
}