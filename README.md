markdown

# Spring Security Course

Welcome to the Spring Security Course! This repository contains the source code and configurations for a comprehensive
course on Spring Security.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Contact](#contact)

# Introduction

This course aims to provide a thorough understanding of Spring Security, covering various aspects such as
authentication, authorization, and security configuration.
By the end of this course, you will be able to secure your
Spring Boot applications effectively.

# Prerequisites

Before you begin, ensure you have met the following requirements:

- Java 21 or later
- Node.js and npm
- Docker and Docker Compose
- Gradle

## Defaults

1. Keycloak
    - URL: http://localhost:8180 - Log in to change or add roles to the student-keycloak realm.
    - Username: admin
    - Password: admin
2. Users
    - Username: professor@fullstackforge.com
    - Password: password
    - Roles: USER, ADMIN
    - Username: student@fullstackforge.com
    - Password: password
    - Roles: USER

# Installation

1. **Clone the Repository:**

```bash
   git clone https://github.com/yourusername/spring-security-course.git
   cd spring-security-course
```

Build the Backend:

```bash
./gradlew bR
Build the Frontend:
```

If you are having issues running the gradlew command, remove the "buildFullStackApp" task from the build.gradle file.
Manually build the frontend by following these steps and copying the build files to the resources/static directory:

```bash
cd frontend
yarn install
yarn build
```

# Configuration

## Backend Configuration

application.yaml: This file contains the configuration for the Spring Boot application, including database settings and
other properties.

Docker Compose: The docker-compose.yaml file sets up the required services, such as PostgreSQL.

## Keycloak Setup

This project includes setting up a Keycloak instance for handling authentication and authorization.
Keycloak is an open-source Identity and Access Management tool that allows us to secure our applications with little to
no code changes.

## Launching Keycloak

To launch the Keycloak instance, we will use Docker.
The `docker-compose.yaml` file provided in this repository already includes the configuration for Keycloak.

1. **Start the Keycloak Container:**

Ensure Docker and Docker Compose are installed and running on your system. Then, execute the following command in the
root directory of your project:

```bash
   docker-compose up -d keycloak
````

## Understanding OAuth2 and Spring OAuth2 Resource Server

### What is OAuth2?

OAuth2 (Open Authorization) is an authorization framework that enables applications to obtain limited access to user
accounts on an HTTP service. It works by delegating user authentication to the service that hosts the user account and
authorizing third-party applications to access the user account. OAuth2 provides specific authorization flows for web
applications, desktop applications, mobile phones, and living room devices.

### Key Concepts of OAuth2

- **Resource Owner**: The user who authorizes an application to access their account.
- **Client**: The application requesting access to the user's account.
- **Resource Server**: The server hosting the protected resources, capable of accepting and responding to protected
  resource requests using access tokens.
- **Authorization Server**: The server issuing access tokens to the client after successfully authenticating the
  resource owner and getting authorization.

### What is Spring OAuth2 Resource Server?

Spring OAuth2 Resource Server is a feature of Spring Security that enables your application to act as a resource server,
serving protected resources. It integrates with OAuth2 and OpenID Connect (OIDC) to provide secure access to resources
using access tokens.

When configured as a resource server, your application can accept and validate JWT (JSON Web Token) tokens issued by an
OAuth2 Authorization Server, such as Keycloak. This setup ensures that only authenticated and authorized users can
access your protected endpoints.

### Configuring Spring OAuth2 Resource Server

To configure your Spring Boot application as an OAuth2 Resource Server, you need to specify the settings in
your `application.yaml` file.
Below is the configuration snippet for enabling the resource server with JWT support,
specifying the issuer URI and the JWK set URI for token validation:

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:8180/realms/student-keycloak
          jwk-set-uri: http://localhost:8180/realms/student-keycloak/protocol/openid-connect/certs
```

# Running the Application

Start Docker Containers:

```bash
docker-compose up -d
```

Run the Spring Boot Application:

```bash
./gradlew bootRun
```

Start the Frontend Development Server:

```bash
cd frontend
yarn install
```

## Project Structure

* src/main/java: Contains the Java source code.
    * config: Configuration classes for security, events, and MVC.
    * controller: REST controllers for handling HTTP requests.
    * service: Business logic and service classes.
* src/main/resources: Contains the application configuration files.
* application.yaml: Main configuration file.

* frontend: Contains the React frontend application.
    * src: React components and TypeScript files.
        * public: Static assets.

## Key Features

1. Spring Security Configuration: Custom security configurations in DefaultSecurityConfig.java.
2. Role-Based Access Control: Role management in Role.java.
3. Event Handling: Custom authentication events in AuthenticationEvents.java.
4. MVC Configuration: Web configuration in WebMvcConfig.java.
5. Student Management: REST API for managing students (StudentController.java, StudentUserService.java,
   StudentRepository.java, Student.java).

### Contact

If you have any questions or need further assistance, feel free to reach out.
@joshuamatosdev
Happy learning!
