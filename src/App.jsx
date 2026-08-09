import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
import RecipeCard from './RecipeCard';

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

  return (
    <Container sx={{ py: 4, fontFamily: '"Georgia", "Times New Roman", serif'}}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Basement Beer
      </Typography>
      
      {recipes.map((recipe) => (
        <Grid size={{ xs: 4, align: "center" }} key={recipe.id}>
          <RecipeCard recipe={recipe}/>
        </Grid>
      ))}
    </Container>
  );
}