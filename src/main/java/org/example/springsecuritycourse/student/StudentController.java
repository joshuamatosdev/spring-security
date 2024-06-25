package org.example.springsecuritycourse.student;

import com.nimbusds.jwt.JWT;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class StudentController {

    @RequestMapping("/api/super")
    @Secured("ROLE_SUPER_ADMIN")
    public String helloSuperAdmin() {
        return "Hello, Super Admin!";
    }
    
    @RequestMapping("/api/admin")
    @RolesAllowed("ADMIN")
    public String hello() {
        return "Hello, Admin!";
    }
    
    @RequestMapping("/api/user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String helloUser() {
        return "Hello, User!";
    }
    
    @RequestMapping("/api/authenticated")
    public String helloAll() {
        return "Hello, All!";
    }
}