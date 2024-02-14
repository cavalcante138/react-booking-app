import { EnhancedStore, configureStore } from '@reduxjs/toolkit';
import bookingReducer, { createBooking, updateBooking, deleteBooking, BookingState } from './bookingSlice';
import { RootState } from '../../infrastructure/redux/store';
import { Booking } from '../../domain/booking/Booking';

describe('booking reducer', () => {
  let store: EnhancedStore<RootState>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        booking: bookingReducer
      },
      middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['booking/createBooking', 'booking/updateBooking'],
          ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
          ignoredPaths: ['items.dates', 'booking.bookings.0.days.0'],
        },
      }),
    });
  });

  it('should handle initial state', () => {
    const expectedState: BookingState = {
      bookings: [],
      error: null
    };
    expect(store.getState().booking).toEqual(expectedState);
  });

  it('should handle createBooking', () => {
    const newBooking: Booking = {
      id: '1',
      bookingId: 'booking1',
      days: [new Date()],
      userName: 'testUser'
    };
    store.dispatch(createBooking(newBooking));
    const storedBooking = store.getState().booking.bookings.find(booking => booking.id === newBooking.id);
    expect(storedBooking).toEqual(newBooking);
  });

  it('should not create to bookings for the same day and same place', () => {
    const newBooking: Booking = {
      id: '1',
      bookingId: 'booking1',
      days: [new Date()],
      userName: 'testUser'
    };
    store.dispatch(createBooking(newBooking));
    store.dispatch(createBooking(newBooking));
    expect(store.getState().booking.bookings.length).toEqual(1);
  }
  );

  it('should handle updateBooking date', () => {
    const initialBooking: Booking = {
      id: '1',
      bookingId: 'booking1',
      days: [new Date()],
      userName: 'testUser'
    };
    store.dispatch(createBooking(initialBooking));

    const updatedBooking: Booking = {
      ...initialBooking,
      days: [new Date('2025-01-01')]
    };
    store.dispatch(updateBooking(updatedBooking));
    const storedBooking = store.getState().booking.bookings.find(booking => booking.id === updatedBooking.id);
    expect(storedBooking).toEqual(updatedBooking);
  });

  it('should handle deleteBooking', () => {
    const initialBooking: Booking = {
      id: '1',
      bookingId: 'booking1',
      days: [new Date()],
      userName: 'testUser'
    };
    store.dispatch(createBooking(initialBooking));
    store.dispatch(deleteBooking(initialBooking.id));
    expect(store.getState().booking.bookings).not.toContainEqual(initialBooking);
  });
});