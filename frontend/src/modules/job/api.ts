import axios from 'axios';
import type { Job, JobCreateRequest } from './types';

const API_BASE = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'}/api/jobs`;

const authHeaders = (token?: string) =>
    token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

export const createJob = async (
    job: JobCreateRequest,
    token?: string
): Promise<Job> => {
    const response = await axios.post<Job>(API_BASE, job, authHeaders(token));
    return response.data;
};

export const fetchJobs = async (
    token?: string
): Promise<Job[]> => {
    const response = await axios.get<Job[]>(API_BASE, authHeaders(token));
    return response.data;
};

export const fetchJobById = async (
    id: number,
    token?: string
): Promise<Job> => {
    const response = await axios.get<Job>(`${API_BASE}/${id}`, authHeaders(token));
    return response.data;
};

export const deleteJob = async (
    id: number,
    token?: string
): Promise<void> => {
    await axios.delete(`${API_BASE}/${id}`, authHeaders(token));
};
