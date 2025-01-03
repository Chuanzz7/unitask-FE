import axios from "axios";

export * from "./auth";
export * from "./subject";
export * from "./group.js";
export * from "./assessment.js";
export * from "./announcement.js";

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});