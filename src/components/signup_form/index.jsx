import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

import Button from "../button/index";
import FormField from "../form_field/index";

const SignupForm = ({
  loading = false,
  onSubmit,
  defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const { confirmPassword, ...payload } = formData;

    onSubmit?.(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

        <FormField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          placeholder="john"
          leftIcon={<User size={18} />}
        />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="john@example.com"
        leftIcon={<Mail size={18} />}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Enter password"
        leftIcon={<Lock size={18} />}
      />

      <FormField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Confirm password"
        leftIcon={<Lock size={18} />}
      />

      <Button
        type="submit"
        loading={loading}
        fullWidth
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;