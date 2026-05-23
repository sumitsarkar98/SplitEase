import api from "./axios";

// ================= REGISTER =================

export const registerUser = (data: {
  fullname: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/register", data);
};

// ================= LOGIN =================

export const loginUser = (data: { email: string; password: string }) => {
  return api.post("/auth/login", data);
};

// ================= LOGOUT =================

export const logoutUser = () => {
  return api.post("/auth/logout");
};

// ================= GET CURRENT USER =================

export const getCurrentUser = () => {
  return api.get("/auth/me");
};
