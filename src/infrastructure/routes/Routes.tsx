import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../../ui/pages/Home";
import Booking from "../../ui/pages/Booking";
import MyBooking from "../../ui/pages/MyBooking";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  },
  {
    path: "booking/:houseId",
    element:
      <Booking />
  },
  {
    path: "/my-bookings",
    element:
      <MyBooking />
  }
]);