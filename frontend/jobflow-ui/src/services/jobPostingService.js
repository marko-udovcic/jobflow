import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export async function addJobPosting(data) {
  const response = await axiosInstance.post(`/job-postings`, data);
  return response.data;
}

export async function getJobPostingsByCompanyId(companyId) {
  console.log("companyId u servicu", companyId);
  const response = await axiosInstance.get(`/job-postings/company/${companyId}`);
  return response.data;
}

export async function getJobPostingById(jobPostingId) {
  const response = await axiosInstance.get(`/job-postings/${jobPostingId}`);
  return response.data;
}
