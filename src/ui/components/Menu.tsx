import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Button color="primary" variant="contained" component={Link} to="/my-bookings">My bookings</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
