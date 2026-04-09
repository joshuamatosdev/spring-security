export type JobStatus = 'OPEN' | 'CLOSED' | 'DRAFT';

export interface Job {
    id?: number;
    title: string;
    description: string;
    company: string;
    location: string;
    status: JobStatus;
    createdAt?: string;
    updatedAt?: string;
}

export interface JobCreateRequest {
    title: string;
    description: string;
    company: string;
    location: string;
    status: JobStatus;
}

export interface JobFormErrors {
    title?: string;
    description?: string;
    company?: string;
    location?: string;
}
