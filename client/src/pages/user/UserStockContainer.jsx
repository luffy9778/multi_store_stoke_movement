import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getStockService } from "../../services/user.service";
import { Typography } from "@mui/material";
import UserStockView from "./UserStockView";
import { useParams } from "react-router-dom";

const UserStockContainer = () => {
  const [page, setPage] = useState(1);
  const limit=10;
  const { productId } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product-stock", productId, page, limit],
    queryFn: () => getStockService({ page, limit, productId }),
  });

  const handlePageChange = (event, newPage) => setPage(newPage + 1);

  if (isError) {
    return (
      <Typography color="error">
        {error.response?.data?.message || "Something went wrong"}
      </Typography>
    );
  }
  return (
    <UserStockView
      stocks={data?.data}
      pagination={data?.pagination}
      onPageChange={handlePageChange}
      isLoading={isLoading}
    />
  );
};

export default UserStockContainer;
