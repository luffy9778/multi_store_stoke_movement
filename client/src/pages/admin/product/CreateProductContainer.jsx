import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProductSchema } from "../../../validations/product.validation";
import { useMutation } from "@tanstack/react-query";
import { createProductService } from "../../../services/admin.service";
import CreateProductView from "./CreateProductView";

const CreateProductContainer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(createProductSchema) });

  const { mutate, isPending } = useMutation({
    mutationFn: createProductService,
    onSuccess: () => {
      alert("product created");
      reset();
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <CreateProductView
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
    />
  );
};

export default CreateProductContainer;
