import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { loginSchema } from "../../validations/auth.validation";
import { loginService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import LoginView from "./LoginView";
const LoginContainer = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: loginService,
    onSuccess: (response) => {
      const { accessToken, role } = response;
      localStorage.setItem("token", accessToken);

      localStorage.setItem("role", role);

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    },

    onError: (error) => {
      setError("root", {
        message: error.response?.data?.message ?? "login failed",
      });
    },
  });

  const onSubmit = (formData) => {
    loginMutation.mutate(formData);
  };
  return (
    <LoginView
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={loginMutation.isPending}
    />
  );
};

export default LoginContainer;
