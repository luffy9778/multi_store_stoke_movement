import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const AdjustStockView = ({
  products,
  productId,
  setProductId,
  stores,
  storeId,
  setStoreId,
  currentStock,
  quantity,
  setQuantity,
  isPending,
  handleSubmit,
}) => {
  return (
    <Box>
      <h1>Adjust stock</h1>
      <FormControl fullWidth>
        <InputLabel>Product</InputLabel>
        <Select
          value={productId}
          label="product"
          onChange={(e) => setProductId(e.target.value)}
        >
          {products?.map((product) => (
            <MenuItem key={product?._id} value={product?._id}>
              {product?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Store</InputLabel>
        <Select
          value={storeId}
          label="store"
          onChange={(e) => setStoreId(e.target.value)}
        >
          {stores?.map((store) => (
            <MenuItem key={store?._id} value={store?._id}>
              {store?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography>Current Stock: {currentStock ?? "--"}</Typography>
      <TextField
        label="Adjust qty By"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isPending || !productId || !storeId || !quantity}
      >
        Adjust
      </Button>
    </Box>
  );
};

export default AdjustStockView;
