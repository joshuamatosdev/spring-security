import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import type { JobCreateRequest, JobFormErrors, JobStatus } from '../types';
import { createJob } from '../api';

const JOB_STATUSES: { value: JobStatus; label: string }[] = [
    { value: 'OPEN', label: 'Open' },
    { value: 'DRAFT', label: 'Draft' },
    { value: 'CLOSED', label: 'Closed' },
];

interface JobCreateFormProps {
    token: string | undefined;
    onSuccess?: () => void;
}

const validate = (form: JobCreateRequest): JobFormErrors => {
    const errors: JobFormErrors = {};
    if (!form.title.trim()) {
        errors.title = 'Title is required';
    } else if (form.title.length > 255) {
        errors.title = 'Title must be at most 255 characters';
    }
    if (form.description.length > 5000) {
        errors.description = 'Description must be at most 5000 characters';
    }
    if (form.company.length > 255) {
        errors.company = 'Company must be at most 255 characters';
    }
    if (form.location.length > 255) {
        errors.location = 'Location must be at most 255 characters';
    }
    return errors;
};

const INITIAL_FORM: JobCreateRequest = {
    title: '',
    description: '',
    company: '',
    location: '',
    status: 'OPEN',
};

export default function JobCreateForm({ token, onSuccess }: JobCreateFormProps) {
    const [form, setForm] = useState<JobCreateRequest>({ ...INITIAL_FORM });
    const [errors, setErrors] = useState<JobFormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (field: keyof JobCreateRequest) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({ ...prev, [field]: e.target.value }));
            setErrors((prev) => ({ ...prev, [field]: undefined }));
            setSubmitError(null);
            setSubmitSuccess(false);
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setSubmitting(true);
        setSubmitError(null);

        try {
            await createJob(form, token);
            setSubmitSuccess(true);
            setForm({ ...INITIAL_FORM });
            onSuccess?.();
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to create job';
            setSubmitError(message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, width: '100%' }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Create Job
            </Typography>
            <form onSubmit={(e) => void handleSubmit(e)} noValidate>
                <Stack spacing={2}>
                    <TextField
                        label="Title"
                        value={form.title}
                        onChange={handleChange('title')}
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                        required
                        fullWidth
                        inputProps={{ 'aria-label': 'Job title' }}
                    />
                    <TextField
                        label="Description"
                        value={form.description}
                        onChange={handleChange('description')}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                        multiline
                        rows={4}
                        fullWidth
                        inputProps={{ 'aria-label': 'Job description' }}
                    />
                    <TextField
                        label="Company"
                        value={form.company}
                        onChange={handleChange('company')}
                        error={Boolean(errors.company)}
                        helperText={errors.company}
                        fullWidth
                        inputProps={{ 'aria-label': 'Company name' }}
                    />
                    <TextField
                        label="Location"
                        value={form.location}
                        onChange={handleChange('location')}
                        error={Boolean(errors.location)}
                        helperText={errors.location}
                        fullWidth
                        inputProps={{ 'aria-label': 'Job location' }}
                    />
                    <TextField
                        select
                        label="Status"
                        value={form.status}
                        onChange={handleChange('status')}
                        fullWidth
                        inputProps={{ 'aria-label': 'Job status' }}
                    >
                        {JOB_STATUSES.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    {submitError && (
                        <Alert severity="error" role="alert">
                            {submitError}
                        </Alert>
                    )}
                    {submitSuccess && (
                        <Alert severity="success" role="alert">
                            Job created successfully!
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={submitting}
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        {submitting ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Create Job'
                        )}
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}
