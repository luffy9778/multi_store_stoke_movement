import { Box, Button, TextField } from "@mui/material";

const CreateStoreView = ({ register, errors, onSubmit, isPending }) => {
  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{ display: "flex", flexDirection: "column", width: 500, gap: 2 }}
      >
        <h1>Create store</h1>
        <TextField
          label="store Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Location"
          {...register("location")}
          error={!!errors.location}
          helperText={errors.location?.message}
        />
        <Button type="submit" variant="contained" disabled={isPending}>
          Create
        </Button>
      </Box>
    </form>
  );
};

export default CreateStoreView;
