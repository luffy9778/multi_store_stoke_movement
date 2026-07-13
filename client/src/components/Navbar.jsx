import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");
  return (
    <Box>
      <Link to="/login">
        <Button>login </Button>
      </Link>
      <Link to="/products">
        <Button>product</Button>
      </Link>

      {role === "ADMIN" && (
        <>
          <Link to="/admin/stock/adjust">
            <Button>stock-adjust</Button>
          </Link>
        </>
      )}
    </Box>
  );
};

export default Navbar;
