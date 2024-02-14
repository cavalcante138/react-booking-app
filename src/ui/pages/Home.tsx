import Grid from '@mui/material/Grid';
import homeBg from '../../assets/home-bg.jpg';
import PlaceCard from '../components/PlaceCard';
import Menu from '../components/Menu';
import { Places } from '../../infrastructure/api/Places';

export default function Home() {
    return (
        <Grid>
            <Grid component={'main'} container sx={{
                height: '100vh',
                backgroundColor: 'lightgray',
                backgroundImage: `url(${homeBg})`,
                backgroundSize: 'cover',
            }} spacing={0} padding={0}>
                <Grid item xs={12}>
                    <Menu />
                </Grid>
                <Grid item xs={12} padding={4}>
                    <h1>Explore <br />
                        Your place <br />
                        To Stay</h1>
                </Grid>
            </Grid>
            <Grid container sx={{
                backgroundColor: '#292929',
            }} spacing={0} padding={0}>
                <Grid item xs={12} padding={4}>
                    <h2>Popular places</h2>
                </Grid>
                {Places.map((place, index) => (
                    <Grid item xs={12} sm={12} md={4} padding={4} key={index}>
                        <PlaceCard key={index} {...place} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}
