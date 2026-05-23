import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useRegister } from "../../HOOKS/auth/useRegister";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#166534",

    "& fieldset": {
      borderColor: "#16a34a",
    },

    "&:hover fieldset": {
      borderColor: "#15803d",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#166534",
      borderWidth: "2px",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#16a34a",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#166534",
  },
};

const Register = () => {
  const { mutate, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation
    if (
      !formData.fullname.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      return;
    }

    mutate({
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 lg:p-8 rounded-xl shadow-md flex flex-col gap-4 w-full max-w-sm"
      >
        <h1 className="text-green-700 text-2xl font-semibold text-center">
          Register
        </h1>

        {/* Full Name */}
        <TextField
          label="Full Name"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={textFieldStyles}
        />

        {/* Email */}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={textFieldStyles}
        />

        {/* Password */}
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          sx={textFieldStyles}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? (
                    <FiEyeOff size={16} className="text-green-700" />
                  ) : (
                    <FiEye size={16} className="text-green-700" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-green-700 text-white py-2.5 rounded-lg hover:bg-green-600 transition disabled:opacity-70"
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </button>

        {/* Footer */}
        <span className="text-xs text-gray-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
