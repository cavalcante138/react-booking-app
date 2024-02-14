import { Button, Grid, Typography } from '@mui/material'
import Menu from '../components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../infrastructure/redux/store'
import { Places } from '../../infrastructure/api/Places';
import BookingCard from '../components/BookingCard';
import { deleteBooking } from '../../application/booking/bookingSlice';
import { useState } from 'react';
import { Booking } from '../../domain/booking/Booking';
import { Link } from 'react-router-dom';
import { DeleteDialog } from '../components/DeleteDialog';
import { UpdateDialog } from '../components/UpdateDialog';

export default function MyBooking() {

    const [isUpdate, setIsUpdate] = useState(false)
    const [modalCancelationOpen, setModalCancelationOpen] = useState(false);
    const [updateBookingData, setUpdateBookingData] = useState<Booking>({
        id: '',
        bookingId: '',
        days: [],
        userName: ''
    })

    const myBooking = useSelector((state: RootState) => state.booking.bookings)

    const dispatch = useDispatch()

    return (
        <Grid container sx={{
            backgroundColor: '#292929',
        }} spacing={0} padding={0}>
            <Grid item xs={12}>
                <Menu />
            </Grid>
            <Grid item xs={12} padding={4}>
                <h2>My Bookings</h2>
            </Grid>
            {myBooking.length === 0 &&
                <Grid item xs={12} padding={4}>
                    <Typography variant="h6" color="white" gutterBottom>You have no bookings yet.</Typography>
                    <Button variant="contained" color="primary" component={Link} to="/">Book Now</Button>
                </Grid>
            }
            {myBooking && myBooking.map((booking, index) => (
                <Grid item xs={12} sm={12} md={4} padding={4} key={index}>
                    {Places.map((place, index) => (
                        booking.bookingId === place.id &&
                                <Grid key={index}>
                                    <BookingCard date={`${new Date(booking.days[0]).toLocaleDateString('en-US')} to ${new Date(booking.days[booking.days.length - 1]).toLocaleDateString('en-US')}`} key={index} {...place}
                                        onCancelBooking={() => {
                                            setModalCancelationOpen(true)
                                        }}
                                        onUpdateBooking={() => {
                                            setUpdateBookingData({
                                                id: booking.id,
                                                bookingId: booking.bookingId,
                                                days: booking.days,
                                                userName: booking.userName
                                            })
                                            setIsUpdate(true)
                                        }}
                                    />
                                    <DeleteDialog
                                        id="delete-dialog"
                                        keepMounted
                                        open={modalCancelationOpen}
                                        onClose={() => {
                                            setModalCancelationOpen(false)
                                        }}
                                        onDelete={() => {
                                            dispatch(deleteBooking(booking.id))
                                            setModalCancelationOpen(false)
                                        }}
                                    />
                                    <UpdateDialog
                                        id="update-dialog"
                                        keepMounted
                                        open={isUpdate}
                                        onClose={() => {
                                            setIsUpdate(false)
                                        }}
                                        booking={updateBookingData}
                                    />
                                </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    )
}
