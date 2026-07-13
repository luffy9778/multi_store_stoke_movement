import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const LoginView = ({ register, errors, onSubmit, isSubmitting }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={onSubmit}>
        <Box
          sx={{
            width: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h1>Login</h1>
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          {errors.root && (
            <Typography color="error">{errors.root.message}</Typography>
          )}
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Login
          </Button>
          <Link to="/signup">SignUp?</Link>
        </Box>
      </form>
    </Box>
  );
};

export default LoginView;
