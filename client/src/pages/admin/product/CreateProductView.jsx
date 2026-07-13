import { Box, Button, TextField } from "@mui/material";

const CreateProductView = ({ register, errors, onSubmit, isPending }) => {
  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{ display: "flex", flexDirection: "column", width: 500, gap: 2 }}
      >
        <h1>Create product</h1>
        <TextField
          label="Product Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="SKU"
          {...register("sku")}
          error={!!errors.sku}
          helperText={errors.sku?.message}
        />
        <Button type="submit" variant="contained" disabled={isPending}>
          Create
        </Button>
      </Box>
    </form>
  );
};

export default CreateProductView;
