import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, Box, } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RecipeCard from './RecipeCard';
import '@fontsource-variable/roboto-serif/wght.css';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the JSON file from the public folder
    fetch('/recipes.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
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
        Error loading recipes: {error}
      </Typography>
    );
  }

  const theme = createTheme({
    typography: {
      fontFamily: '"Roboto Serif Variable", serif',
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#4A5568',      // Mineral Slate
        light: '#718096',
        dark: '#2D3748',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#D69E2E',      // Roasted Amber / Malt
        light: '#ECC94B',
        dark: '#B7791F',
        contrastText: '#000000',
      },
      background: {
        default: '#1A202C',   // Deep Basalt Grey
        paper: '#2D3748',     // Cellar Wall Grey
      },
      text: {
        primary: '#EDF2F7',
        secondary: '#A0AEC0',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Basement Beer
        </Typography>
        
        <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, align: "center"}} key={recipe.id}>
            <RecipeCard recipe={recipe}/>
          </Grid>
        ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}