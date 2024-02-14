import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { Place } from '../../domain/places/Place';

export default function PlaceCard({
    id,
    photo,
    price,
    title
  }: Place) {
  return (
    <Card sx={{
        borderRadius: 5
    }}>
        <CardActionArea
        component={Link}
        to={`/booking/${id}`}
        >
            <CardMedia
                component="img"
                height="450"
                image={photo}
                alt={title}
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={12} padding={0}>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            ${price}/night
                        </Typography>
                    </Grid>
                    <Grid item xs={12} 
                    flexDirection={'row'}
                    justifyContent={'flex-end'}
                    >
                        <Button color="primary" variant="contained">Book Now</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}
