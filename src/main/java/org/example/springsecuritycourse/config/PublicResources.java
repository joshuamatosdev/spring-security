package org.example.springsecuritycourse.config;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;  
import java.util.HashSet;


@Component
@RequiredArgsConstructor
public class PublicResources {
    private static final List<String> DEFAULT_PUBLIC_RESOURCES = List.of("/static/**", "/index.html", "/assets/*", "vite.svg");
    private final Set<String> patterns = new HashSet<>(DEFAULT_PUBLIC_RESOURCES);
    
    public String[] getPublicResources() {
        return patterns.toArray(new String[0]);
    }
}