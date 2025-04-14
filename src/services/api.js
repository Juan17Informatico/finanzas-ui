import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
