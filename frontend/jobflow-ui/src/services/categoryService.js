import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export async function getCategories() {
  const response = await axiosInstance.get(`/categories`);
  return response.data;
}
