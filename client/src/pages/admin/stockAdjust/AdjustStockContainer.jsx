import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adjustStockService,
  getProductsService,
  getStockService,
  getStoreService,
} from "../../../services/admin.service";
import { useState } from "react";
import AdjustStockView from "./AdjustStockView";

const AdjustStockContainer = () => {
  const [productId, setProductId] = useState("");
  const [storeId, setStoreId] = useState("");
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
    queryKey: ["stock", productId, storeId],
    queryFn: () => getStockService({ productId, storeId }),
    enabled: !!productId && !!storeId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: adjustStockService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stock", productId, storeId],
      });
      alert("Stock updated successfully");

      setQuantity("");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = () => {
    mutate({ productId, storeId, quantity: Number(quantity) });
  };
  return (
    <AdjustStockView
      productId={productId}
      products={products?.data}
      setProductId={setProductId}
      storeId={storeId}
      stores={stores?.data}
      setStoreId={setStoreId}
      currentStock={currentStock?.data?.[0]?.quantity}
      quantity={quantity}
      setQuantity={setQuantity}
      isPending={isPending}
      handleSubmit={handleSubmit}
    />
  );
};

export default AdjustStockContainer;
