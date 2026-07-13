import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { signUpSchema } from "../../validations/auth.validation";
import { signUpService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import SignUpView from "./SignUpView";
const SignUpContainer = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const signUpMutation = useMutation({
    mutationFn: signUpService,
    onSuccess: () => {
      navigate("/login");
    },

    onError: (error) => {
      setError("root", {
        message: error.response?.data?.message ?? "signUp failed",
      });
    },
  });

  const onSubmit = (formData) => {
    signUpMutation.mutate(formData);
  };
  return (
    <SignUpView
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={signUpMutation.isPending}
    />
  );
};

export default SignUpContainer;
