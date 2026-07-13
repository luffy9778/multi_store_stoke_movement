import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createStoreSchema } from "../../../validations/store.validation";
import { createStoreService } from "../../../services/admin.service";
import { useMutation } from "@tanstack/react-query";
import CreateStoreView from "./CreateStoreView";

const CreateStoreContainer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createStoreSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createStoreService,
    onSuccess: () => {
      alert("store created");
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
    <CreateStoreView
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
    />
  );
};

export default CreateStoreContainer;
