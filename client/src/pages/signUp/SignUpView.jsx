import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const SignUpView = ({ register, errors, onSubmit, isSubmitting }) => {
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
          <h1>SignUp</h1>
          <TextField
            label="Username"
            type="text"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
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
            SignUp
          </Button>
          <Link to="/login">Login?</Link>
        </Box>
      </form>
    </Box>
  );
};

export default SignUpView;
