import axios from 'axios';
import type { Job, JobCreateRequest } from './types';

const API_BASE = 'http://localhost:8080/api/jobs';

const authHeaders = (token: string | undefined) => ({
    headers: { Authorization: `Bearer ${token}` },
});

export const createJob = async (
    job: JobCreateRequest,
    token: string | undefined
): Promise<Job> => {
    const response = await axios.post<Job>(API_BASE, job, authHeaders(token));
    return response.data;
};

export const fetchJobs = async (
    token: string | undefined
): Promise<Job[]> => {
    const response = await axios.get<Job[]>(API_BASE, authHeaders(token));
    return response.data;
};

export const fetchJobById = async (
    id: number,
    token: string | undefined
): Promise<Job> => {
    const response = await axios.get<Job>(`${API_BASE}/${id}`, authHeaders(token));
    return response.data;
};

export const deleteJob = async (
    id: number,
    token: string | undefined
): Promise<void> => {
    await axios.delete(`${API_BASE}/${id}`, authHeaders(token));
};
