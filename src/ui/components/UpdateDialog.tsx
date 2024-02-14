import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { Calendar, getAllDatesInRange } from "react-multi-date-picker";
import { Booking } from "../../domain/booking/Booking";
import { useDispatch, useSelector } from "react-redux";
import { checkDuplicateBookings, updateBooking } from "../../application/booking/bookingSlice";
import { toast } from "react-toastify";
import { RootState } from "../../infrastructure/redux/store";

export interface UpdateDialogProps {
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: () => void;
  booking: Booking;
}

export function UpdateDialog(props: UpdateDialogProps) {
  const { onClose, open, booking, ...other } = props;
  const [dates, setDates] = useState<Date[]>(booking.days)
  const [allDates, setAllDates] = useState<any[]>([]);
  const bookingState = useSelector((state: RootState) => state.booking)

  const dispatch = useDispatch()

  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    setDates(booking.days)
  },[booking]);

  const handleOk = async () => {
    if (allDates.length == 0) {
      toast.error('Please select a date range')
      return
  }
  const myDates: Date[] = [];
  await allDates.forEach(date => {
      myDates.push(date.format())
  })
  if(checkDuplicateBookings(bookingState, { id: booking.id, bookingId: booking.bookingId, days: myDates, userName: booking.userName })){
    toast.error('There is a booking for this period.')
    return
  }
  dispatch(updateBooking({
      id: booking.id,
      bookingId: booking.bookingId,
      days: myDates,
      userName: booking.userName
  }))
  onClose();
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle color="primary">Select the date to update your booking</DialogTitle>
      <DialogContent dividers>
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
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk} color="error">Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
