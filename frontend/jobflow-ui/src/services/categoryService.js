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

export async function addCategory(data) {
  const response = await axiosInstance.post(`/categories`, data);
  return response.data;
}

export async function updateCategory(id, data) {
  const response = await axiosInstance.put(`/categories/${id}`, data);
  return response.data;
}

export async function deleteCategory(id) {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
}
