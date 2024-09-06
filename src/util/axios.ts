import axios from "axios";

// Production URL
const BASE_URL = 'https://api.garikaghayan.top/api/v1';

// Test URL
// const BASE_URL = 'http://localhost:3200/api/v1';

export const axiosPublic = axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});