import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Booking } from '../../domain/booking/Booking'

export interface BookingState {
    bookings: Booking[]
    error: string | null
}

const initialState: BookingState = {
    bookings: [],
    error: null,
}

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        createBooking: (state, action: PayloadAction<Booking>) => {
            const existingBookingSameDate = checkDuplicateBookings(state, action.payload)
            if (!existingBookingSameDate) {
                state.bookings.push(action.payload)
                state.error = null
              } else {
                state.error = ('There is a booking for this period.')
              }
        },
        updateBooking: (state, action: PayloadAction<Booking>) => {
            const index = state.bookings.findIndex(booking => booking.id === action.payload.id)
            const existingBookingSameDate = checkDuplicateBookings(state, action.payload)
            if (!existingBookingSameDate) {
                state.bookings[index] = action.payload
                state.error = null
              } else {     
                state.error = ('There is a booking for this period.')
              }
        },
        deleteBooking: (state, action: PayloadAction<string>) => {
            const index = state.bookings.findIndex(booking => booking.id === action.payload)
            if (index !== -1) {
                state.bookings.splice(index, 1)
            }
        },
    },
})

export const { createBooking, updateBooking, deleteBooking } = bookingSlice.actions

export default bookingSlice.reducer

export const selectBookingById = (state: BookingState, userName: string) =>
    state.bookings.find(booking => booking.userName === userName)

export const checkDuplicateBookings = (state: BookingState, booking: Booking) => {
    const existingBookingsSameId = state.bookings.filter(b => b.bookingId === booking.bookingId)
    const existingBookingSameDate = existingBookingsSameId.find(b => b.days.some(day => booking.days.includes(day)))
    if(existingBookingSameDate){
        return true
    }
    return false
}