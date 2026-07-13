import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const UserStockView = ({ stocks, pagination, onPageChange, isLoading }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Store Name</TableCell>
              <TableCell>Availabe Qty</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            ) : stocks?.length === 0 ? (
              <TableRow>
                <TableCell>no stock</TableCell>
              </TableRow>
            ) : (
              stocks?.map((stock) => (
                <TableRow key={stock?._id} hover>
                  <TableCell>{stock?.store?.name}</TableCell>
                  <TableCell>{stock?.quantity}</TableCell>
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

export default UserStockView;
