package org.example.springsecuritycourse.config;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public enum Role {
    USER, ADMIN, SUPER_ADMIN;
    
    public static boolean isValid(String role){
        try{
            Role.valueOf(role.toUpperCase().replace(" ", "_"));
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}