import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Typography, DialogActions, Button, Chip, Box, Accordion, AccordionDetails, AccordionSummary, Container, Grid, CircularProgress, Dialog, DialogTitle, DialogContent, Divider, CardHeader, List, ListItem} from '@mui/material';
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
          <Typography dense variant="caption" fontWeight="medium">
            {recipe.flavor_text}
          </Typography>
        </Box>

        <Typography variant="body2">
          {recipe.description}
        </Typography>

        <Typography variant="body1" sx={{ textDecoration: 'underline' }}>
          Brews of this Beer:
        </Typography>

        <Grid container spacing={1}>
        {recipe.brews.map((brew) => (
          <Grid item size={{ align: "center"}}>
            <BrewLink key={brew.brew_date} brew={brew} beer_name={recipe.name} sx={{padding: 2}}/>
          </Grid>
        ))}
        </Grid>

      </CardContent>
    </Card>
  );
}

export function BrewLink({ brew, beer_name }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  return (
    <Box display="inline-block" m={1}>
      <Button 
        sx={{ align: "center"}} 
        variant="contained" 
        onClick={handleOpen}
      >
        {brew.brew_date}
      </Button>

      <BrewDialog 
        brew={brew} 
        beer_name={beer_name} 
        open={dialogOpen} 
        onClose={handleClose} 
      />
    </Box>
  );
}

export function BrewDialog({ brew, beer_name, open, onClose }) {

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography sx={{ textDecoration: 'underline' }}>{beer_name}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1'>Date: {brew.brew_date}</Typography>

        {/*Vitals*/}
        <Typography sx={{ textDecoration: 'underline' }}>Vitals</Typography>
        <List dense>
          <ListItem key="MashTemp">
            <Typography variant='body1'>Vital | Expected | Actual</Typography>
          </ListItem>
          <ListItem key="MashTemp">
            <Typography variant='body2'>ABV | {brew.abv_target}% | {brew.abv_actual}%</Typography>
          </ListItem>
          <ListItem key="MashTemp">
            <Typography variant='body2'>IBU | {brew.ibu_target} | {brew.ibu_actual}</Typography>
          </ListItem>
          <ListItem key="MashTemp">
            <Typography variant='body2'>OG | {brew.og_target} | {brew.og_actual}</Typography>
          </ListItem>
          <ListItem key="MashTemp">
            <Typography variant='body2'>FG | {brew.fg_target} | {brew.fg_actual}</Typography>
          </ListItem>
        </List>

        {/*Grain Bill*/}
        <Typography sx={{ textDecoration: 'underline' }}>Grain Bill</Typography>
        <List dense>
          {brew.recipe.grains.map((grain) => (
            <ListItem key={grain[0]}>
              <Typography variant='body2'>{grain[0]}: {grain[1]}%</Typography>
            </ListItem>
          ))}
          <ListItem key="MashTemp">
            <Typography variant='body2'>Mash @ {brew.recipe.mash_temp}°F for 60 Mins</Typography>
          </ListItem>
        </List>

        {/*Hop Schedule*/}
        <Typography sx={{ textDecoration: 'underline' }}>Hop Schedule</Typography>
        <List dense>
          {brew.recipe.hops.map((hop) => (
            <ListItem key={hop.hop_name}>
              <Typography variant='body2'>{hop.hop_name} | {hop.amount} | {hop.time} mins</Typography>
            </ListItem>
          ))}
          <ListItem key="BoilLength"><Typography variant='body2'>60 Min Boil</Typography></ListItem>
        </List>

        {/*Mash Time*/}
        <Typography sx={{ textDecoration: 'underline' }}>Yeast</Typography>
        <List dense>
          <ListItem key="Yeast"><Typography variant='body2'>{brew.recipe.yeast}</Typography></ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{color: (theme) => theme.palette.text.primary}}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}