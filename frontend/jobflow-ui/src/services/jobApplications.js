import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export async function getJobApplicationsByWorkerId(workerId) {
  const response = await axiosInstance.get(`/job-applications/${workerId}`);
  return response.data;
}

export async function getJobApplicationsByJobPostingId(page, jobPostingId) {
  const response = await axiosInstance.get(
    `/job-applications/job-post/${jobPostingId}?page=${page}&size=2`,
  );
  return response.data;
}

export async function addJobApplication(data) {
  const response = await axiosInstance.post(`/job-applications`, data);
  return response.data;
}
export async function updateJobApplicationStatus(data) {
  console.log("ispis data iz servisa", data);
  const response = await axiosInstance.put(`/job-applications`, data);
  return response.data;
}
