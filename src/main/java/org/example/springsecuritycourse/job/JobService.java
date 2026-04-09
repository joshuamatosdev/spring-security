package org.example.springsecuritycourse.job;

import java.util.List;

public interface JobService {

    Job create(Job job);

    List<Job> findAll();

    Job findById(Long id);

    List<Job> findByStatus(JobStatus status);

    Job update(Long id, Job job);

    void delete(Long id);
}
