import axios from "axios";

const API_URL = import.meta.env.VITE_AUTH_API_URL;
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export async function signUpUser(user) {
  try {
    const response = await axios.post(`${API_URL}/public/register`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to register");
  }
}

export async function loginUser(credentials) {
  try {
    const response = await axiosInstance.post(`/public/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to login");
  }
}

export async function logoutUser() {
  const response = await axiosInstance.post(`/logout`);
  return response.data;
}

export async function getCurrentUser() {
  const response = await axiosInstance.get("/current-user");
  return response.data;
}

export async function verifyEmail(token) {
  const response = await axiosInstance.get(`/public/verify?token=${token}`);
  return response.data;
}
