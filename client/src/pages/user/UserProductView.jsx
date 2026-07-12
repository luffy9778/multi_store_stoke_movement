import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const UserProductView = ({
  products,
  pagination,
  onPageChange,
  onViewStock,
  isLoading,
}) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            ) : products?.length === 0 ? (
              <TableRow>
                <TableCell>no product</TableCell>
              </TableRow>
            ) : (
              products?.map((product) => (
                <TableRow key={product?._id} hover>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>
                    <Button onClick={() => onViewStock(product?._id)}>
                      view stock
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={pagination?.total}
        page={pagination?.page - 1}
        rowsPerPage={pagination?.limit}
        rowsPerPageOptions={[]}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default UserProductView;
