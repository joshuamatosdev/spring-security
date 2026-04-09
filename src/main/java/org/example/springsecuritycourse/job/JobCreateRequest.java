package org.example.springsecuritycourse.job;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobCreateRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must be at most 255 characters")
    private String title;

    @Size(max = 5000, message = "Description must be at most 5000 characters")
    private String description;

    @Size(max = 255, message = "Company must be at most 255 characters")
    private String company;

    @Size(max = 255, message = "Location must be at most 255 characters")
    private String location;

    @NotNull(message = "Status is required")
    private JobStatus status;

    public Job toEntity() {
        return Job.builder()
                .title(title)
                .description(description)
                .company(company)
                .location(location)
                .status(status != null ? status : JobStatus.OPEN)
                .build();
    }
}
