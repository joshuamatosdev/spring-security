import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import JobCreateForm from './job-create-form';
import * as api from '../api';

vi.mock('../api', () => ({
    createJob: vi.fn(),
}));

const mockToken = 'test-jwt-token';

describe('JobCreateForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all form fields', () => {
        render(<JobCreateForm token={mockToken} />);

        expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/job description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/job location/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/job status/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create job/i })).toBeInTheDocument();
    });

    it('renders the form heading', () => {
        render(<JobCreateForm token={mockToken} />);
        expect(screen.getByRole('heading', { name: /create job/i })).toBeInTheDocument();
    });

    it('shows validation error when title is empty', async () => {
        render(<JobCreateForm token={mockToken} />);
        const submitButton = screen.getByRole('button', { name: /create job/i });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/title is required/i)).toBeInTheDocument();
        });
        expect(api.createJob).not.toHaveBeenCalled();
    });

    it('submits the form with valid data', async () => {
        const mockOnSuccess = vi.fn();
        vi.mocked(api.createJob).mockResolvedValueOnce({
            id: 1,
            title: 'Software Engineer',
            description: 'Build things',
            company: 'Acme Corp',
            location: 'Remote',
            status: 'OPEN',
        });

        render(<JobCreateForm token={mockToken} onSuccess={mockOnSuccess} />);
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/job title/i), 'Software Engineer');
        await user.type(screen.getByLabelText(/job description/i), 'Build things');
        await user.type(screen.getByLabelText(/company name/i), 'Acme Corp');
        await user.type(screen.getByLabelText(/job location/i), 'Remote');

        fireEvent.click(screen.getByRole('button', { name: /create job/i }));

        await waitFor(() => {
            expect(api.createJob).toHaveBeenCalledWith(
                {
                    title: 'Software Engineer',
                    description: 'Build things',
                    company: 'Acme Corp',
                    location: 'Remote',
                    status: 'OPEN',
                },
                mockToken
            );
        });

        await waitFor(() => {
            expect(screen.getByText(/job created successfully/i)).toBeInTheDocument();
        });
        expect(mockOnSuccess).toHaveBeenCalled();
    });

    it('displays error alert when API call fails', async () => {
        vi.mocked(api.createJob).mockRejectedValueOnce(new Error('Network error'));

        render(<JobCreateForm token={mockToken} />);
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/job title/i), 'Test Job');
        fireEvent.click(screen.getByRole('button', { name: /create job/i }));

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/network error/i);
        });
    });

    it('resets form after successful submission', async () => {
        vi.mocked(api.createJob).mockResolvedValueOnce({
            id: 1,
            title: 'Test',
            description: '',
            company: '',
            location: '',
            status: 'OPEN',
        });

        render(<JobCreateForm token={mockToken} />);
        const user = userEvent.setup();

        const titleInput = screen.getByLabelText(/job title/i);
        await user.type(titleInput, 'Test Job');
        fireEvent.click(screen.getByRole('button', { name: /create job/i }));

        await waitFor(() => {
            expect(titleInput).toHaveValue('');
        });
    });

    it('disables submit button while submitting', async () => {
        let resolvePromise: (value: unknown) => void;
        const pendingPromise = new Promise((resolve) => {
            resolvePromise = resolve;
        });
        vi.mocked(api.createJob).mockReturnValueOnce(pendingPromise as Promise<never>);

        render(<JobCreateForm token={mockToken} />);
        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/job title/i), 'Test Job');
        fireEvent.click(screen.getByRole('button', { name: /create job/i }));

        await waitFor(() => {
            expect(screen.getByRole('button')).toBeDisabled();
        });

        resolvePromise!({
            id: 1, title: 'Test', description: '', company: '', location: '', status: 'OPEN',
        });

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /create job/i })).toBeEnabled();
        });
    });
});
