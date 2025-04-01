import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export async function addDigitalCv(data) {
  const response = await axiosInstance.post(`/digital-cv`, data);
  return response.data;
}

export async function getDigitalCvByUserId(userId) {
  const response = await axiosInstance.get(`/digital-cv/${userId}`);
  return response.data;
}
