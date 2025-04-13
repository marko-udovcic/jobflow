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

export async function deleteJobPosting(id) {
  console.log("usa san u fjukciju", id);
  const response = await axiosInstance.delete(`/job-postings/${id}`);
  return response.data;
}

export async function getExploreJobPostings({ title, location, page = 0, size = 10 }) {
  const response = await axiosInstance.get(
    `/job-postings/search?title=${title}&location=${location}&page=${page}&size=${size}`,
  );
  return response.data;
}

export async function getSuggestLocations(prefix) {
  console.log("prefix u servicu", prefix);
  const response = await axiosInstance.get(`/job-postings/suggest-locations?prefix=${prefix}`);
  return response.data;
}
export async function getSuggestJobTitles(prefix) {
  const response = await axiosInstance.get(`/job-postings/suggest-job-titles?prefix=${prefix}`);
  return response.data;
}
