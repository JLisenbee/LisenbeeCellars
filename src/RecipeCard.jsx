import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Chip, Box, Accordion, AccordionDetails, AccordionSummary, Container, Grid, CircularProgress } from '@mui/material';
import { ExpandMore } from '@mui/icons-material'

export default function RecipeCard({ recipe }) {

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

        <Typography variant="body1" sx={{ textDecoration: 'underline' }}>
          Brews of this Beer:
        </Typography>

        {recipe.brews.map((brew) => (
          BrewLink(brew)
        ))}

      </CardContent>
    </Card>
  );
}

export function BrewLink( brew ) {

  return (
    <Button key={brew.brew_date} sx={{ align: "center" }} variant="outlined" onClick={BrewDialog()}>
      {brew.brew_date}
    </Button>
  );
}

export function BrewDialog( recipe ) {
  return (
    stuff
  );
}