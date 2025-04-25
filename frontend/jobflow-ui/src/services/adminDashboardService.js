import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export async function getStatistics() {
  const response = await axiosInstance.get(`/admin/dashboard/statistics`);
  return response.data;
}

export async function searchUser(email = "", page = 0, size = 2) {
  const response = await axiosInstance.get(`/admin/dashboard/search-users`, {
    params: {
      email,
      page,
      size,
    },
  });
  return response.data;
}

export async function updateUserStatus(userId, enabled) {
  const response = await axiosInstance.put(`/users/user-status/${userId}`, null, {
    params: {
      enabled,
    },
  });
  return response.data;
}
