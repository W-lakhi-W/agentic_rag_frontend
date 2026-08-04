import { useState } from "react";
import { User, Lock } from "lucide-react";

import Button from "../button";
import FormField from "../form_field"

const LoginForm = ({
  onSubmit,
  loading = false,
  defaultValues = {
    username: "",
    password: "",
  },
}) => {
  const [formData, setFormData] = useState(defaultValues);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};


    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }
    if(!formData.username.trim()){
      newErrors.username = "Username is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit?.(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <FormField
        label="Username"
        name="username"
        type="text"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        leftIcon={<User size={18} />}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        leftIcon={<Lock size={18} />}
      />

      <Button
        type="submit"
        loading={loading}
        fullWidth
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;