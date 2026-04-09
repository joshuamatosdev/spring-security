package org.example.springsecuritycourse.job;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    @Override
    public Job create(Job job) {
        job.setCreatedAt(LocalDateTime.now());
        job.setUpdatedAt(LocalDateTime.now());
        return jobRepository.save(job);
    }

    @Override
    public List<Job> findAll() {
        return jobRepository.findAll();
    }

    @Override
    public Job findById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException(id));
    }

    @Override
    public List<Job> findByStatus(JobStatus status) {
        return jobRepository.findByStatus(status);
    }

    @Override
    public Job update(Long id, Job updatedJob) {
        Job existing = findById(id);
        existing.setTitle(updatedJob.getTitle());
        existing.setDescription(updatedJob.getDescription());
        existing.setCompany(updatedJob.getCompany());
        existing.setLocation(updatedJob.getLocation());
        existing.setStatus(updatedJob.getStatus());
        existing.setUpdatedAt(LocalDateTime.now());
        return jobRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        Job job = findById(id);
        jobRepository.delete(job);
    }
}
