import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/authApi";

const initialFormData = {
  email: "",
  password: "",
};

const useLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password.");
      return;
    }

    const loginData = {
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      setIsLoading(true);

      const response = await loginUser(loginData);

      const token =
        response?.data?.token ||
        response?.data?.accessToken ||
        response?.token ||
        response?.accessToken;

      const user = response?.data?.user || response?.user;

      const isSuccess = response?.success === true || Boolean(token);

      if (!isSuccess) {
        toast.error(response?.message || "Login failed.");
        return;
      }

      // Clear old authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Save token only in localStorage
      if (token) {
        localStorage.setItem("token", token);
      }

      // Save user only in localStorage
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success(response?.message || "Login successfully!");

      setFormData(initialFormData);

      // Redirect shopkeeper to dashboard
      navigate("/shop/dashboard", { replace: true });

    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Invalid email or password. Please try again.";

      toast.error(errorMessage, {
        toastId: "login-error",
      });

    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;