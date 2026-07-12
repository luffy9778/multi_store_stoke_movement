import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductsService } from "../../services/user.service";
import UserProductView from "./UserProductView";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const UserProductContainer = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getProductsService({ page, limit }),
  });

  const handlePageChange = (event, newPage) => setPage(newPage + 1);
  const handleViewStock = (productId) => {
    navigate(`/products/${productId}`);
  };
  if (isError) {
    return (
      <Typography color="error">
        {error.response?.data?.message || "Something went wrong"}
      </Typography>
    );
  }
  return (
    <UserProductView
      products={data?.data}
      pagination={data?.pagination}
      onPageChange={handlePageChange}
      onViewStock={handleViewStock}
      isLoading={isLoading}
    />
  );
};

export default UserProductContainer;
