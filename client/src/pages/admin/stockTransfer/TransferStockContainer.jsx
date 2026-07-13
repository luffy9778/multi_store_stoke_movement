import {
  getProductsService,
  getStockService,
  getStoreService,
  transferStockService,
} from "../../../services/admin.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TransferStockView from "./TransferStockView";
import { useState } from "react";

const TransferStockContainer = () => {
  const [productId, setProductId] = useState("");
  const [sourseStoreId, setSourseStoreId] = useState("");
  const [destinationStoreId, setDestinationStoreId] = useState("");
  const [quantity, setQuantity] = useState("");
  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsService,
  });
  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: getStoreService,
  });
  const { data: currentStock } = useQuery({
    queryKey: ["stock", productId, sourseStoreId],
    queryFn: () => getStockService({ productId, storeId: sourseStoreId }),
    enabled: !!productId && !!sourseStoreId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: transferStockService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stock", productId, sourseStoreId],
      });
      alert("Stock tranferd successfully");

      setQuantity("");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = () => {
    mutate({
      productId,
      sourseStoreId,
      destinationStoreId,
      quantity: Number(quantity),
    });
  };

  return (
    <TransferStockView
      productId={productId}
      products={products?.data}
      setProductId={setProductId}
      sourseStoreIdId={sourseStoreId}
      destinationStoreId={destinationStoreId}
      setSourseStoreId={setSourseStoreId}
      setDestinationStoreId={setDestinationStoreId}
      stores={stores?.data}
      currentStock={currentStock?.data?.[0]?.quantity}
      quantity={quantity}
      setQuantity={setQuantity}
      isPending={isPending}
      handleSubmit={handleSubmit}
    />
  );
};

export default TransferStockContainer;
