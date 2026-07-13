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

const TransferStockView = ({
  products,
  stores,
  productId,
  setProductId,
  sourseStoreIdId,
  setSourseStoreId,
  destinationStoreId,
  setDestinationStoreId,
  quantity,
  setQuantity,
  currentStock,
  isPending,
  handleSubmit,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <h1>Transfer stock</h1>
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
        <InputLabel>Sourse Store</InputLabel>
        <Select
          value={sourseStoreIdId}
          label="store"
          onChange={(e) => setSourseStoreId(e.target.value)}
        >
          {stores?.map((store) => (
            <MenuItem key={store?._id} value={store?._id}>
              {store?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography>Current Stock: {currentStock ?? "--"}</Typography>

      <FormControl fullWidth>
        <InputLabel>Destination Store</InputLabel>
        <Select
          value={destinationStoreId}
          label="store"
          onChange={(e) => setDestinationStoreId(e.target.value)}
        >
          {stores?.map((store) => (
            <MenuItem key={store?._id} value={store?._id}>
              {store?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Transfer qty"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={
          isPending ||
          !productId ||
          !sourseStoreIdId ||
          !destinationStoreId ||
          !quantity
        }
      >
        Transfer
      </Button>
    </Box>
  );
};

export default TransferStockView;
