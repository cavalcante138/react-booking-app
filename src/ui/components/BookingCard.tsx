import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'

interface BookingCardProps{
    photo: string;
    date: string;
    title: string;
    onCancelBooking: () => void;
    onUpdateBooking: () => void;
}

export default function BookingCard({
    photo,
    date,
    title,
    onCancelBooking,
    onUpdateBooking
  }: BookingCardProps) {
  return (
    <Card sx={{
        borderRadius: 5
    }}>
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
                            {date}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} 
                    flexDirection={'row'}
                    justifyContent={'flex-end'}
                    >
                        <Button color="primary" variant="contained"
                        onClick={()=> onUpdateBooking()}
                        >Update Booking</Button>
                    </Grid>
                    <Grid item xs={12} 
                    flexDirection={'row'}
                    justifyContent={'flex-end'}
                    marginTop={2}
                    >
                        <Button color="error" variant="contained"
                        onClick={()=> onCancelBooking()}
                        >Cancel Booking</Button>
                    </Grid>
                </Grid>
            </CardContent>
    </Card>
  )
}
