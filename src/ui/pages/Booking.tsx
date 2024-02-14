import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from '../components/Menu';
import { Calendar, getAllDatesInRange } from 'react-multi-date-picker';
import {  useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkDuplicateBookings, createBooking } from '../../application/booking/bookingSlice';
import { RootState } from '../../infrastructure/redux/store';
import { getProductById } from '../../infrastructure/api/Places';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export default function Booking() {

    const [dates, setDates] = useState<any[]>([]);
    const [allDates, setAllDates] = useState<any[]>([]);
    const [userName, setUserName] = useState<string>('');

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const errorMessage = useSelector((state: RootState) => state.booking.error)
    const bookingState = useSelector((state: RootState) => state.booking)
    const { houseId } = useParams();
    const product = getProductById(houseId!);

    useEffect(() => {
        if(errorMessage) {
            toast.error(errorMessage)
            return
         }
    }
    , [errorMessage])

    const onHandleBookingSubmit = async () => {
            if (userName === '') {
                toast.error('Please enter your name')
                return
            }
            if (allDates.length === 0) {
                toast.error('Please select a date range')
                return
            }
            if (houseId) {
                const myDates: Date[] = [];
                await allDates.forEach(date => {
                    myDates.push(date.format())
                })
                if(checkDuplicateBookings(bookingState, { id: uuidv4(), bookingId: houseId, days: myDates, userName: userName })){
                    toast.error('There is a booking for this period.')
                    return
                }
                dispatch(createBooking({ id: uuidv4(), bookingId: houseId, days: myDates, userName: userName }))
                navigate('/my-bookings')
            }
        
    }

    return (
        <>
            <Grid component={'main'} container sx={{
                height: '100vh',
                backgroundColor: 'lightgray',
                backgroundImage: `url(${product?.photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }} spacing={0} padding={0}>
                <Grid container
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1,
                        backgroundColor: '#00000061'
                    }}></Grid>
                <Grid container
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 2
                    }}
                >
                    <Grid item xs={12}>
                        <Menu />
                    </Grid>
                    <Grid item xs={12} md={8} padding={10}
                        flex-direction="collumn"
                        justifyContent="center"
                        alignItems="flex-end"
                        flex={1}
                        display={'flex'}
                    >
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" color="white"
                                align='center'
                            >
                                {product?.title}
                            </Typography>
                            <Typography variant="h5" color="white" align='center'>
                                ${product?.price}/night
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} padding={4}>
                        <Card sx={{
                                backgroundColor: '#ffffff23',
                                boxShadow: '0px 0px 3px 0px #ffffff'
                            }}
                            variant='outlined'
                            >
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12} padding={0}>
                                        <Typography variant="h6" gutterBottom color="white">
                                            Booking information
                                        </Typography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={12}>
                                                <TextField
                                                    required
                                                    variant="filled"
                                                    id="name"
                                                    name="name"
                                                    label="Name"
                                                    fullWidth
                                                    autoComplete="given-name"
                                                    onChange={(e) => setUserName(e.target.value)}
                                                    value={userName}
                                                    style={{ backgroundColor: 'white' }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Calendar
                                                    range                                             
                                                    highlightToday={false}
                                                    value={dates}
                                                    onChange={(value: any) => {
                                                        setDates(value)
                                                        setAllDates(getAllDatesInRange(value))
                                                    }
                                                    }
                                                    minDate={new Date()}
                                                />
                                                {dates.length > 0 &&
                                                    <Typography variant="h6" gutterBottom marginTop={2} color={'white'}>
                                                        Total Price: ${product!.price * allDates.length}
                                                    </Typography>
                                                }
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onClick={onHandleBookingSubmit}
                                        >
                                            Book now
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
