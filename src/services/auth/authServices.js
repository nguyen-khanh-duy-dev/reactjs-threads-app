import { http } from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const response = await http.get("/api/auth/user");

    return response.data;
  },
);

// Register
export const register = async (data) => {
  const response = await http.post("/api/auth/register", data);
  console.log(response);

  return response.data;
};

// Login

export const login = async (data) => {
  const response = await http.post("/api/auth/login", data);
  return response.data;
};

// Logout
export const logout = async () => {
  const response = await http.post("/api/auth/logout");
  return response.data;
};

// Check exist email
export const checkExistsEmail = async (email) => {
  const response = await http.get(`/auth/check-email?email=${email}`);
  return response.data.exists;
};
