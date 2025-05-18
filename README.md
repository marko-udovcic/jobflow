# Jobflow

This web application aims to simplify the employment process for unemployed individuals and offer existing workers additional earning opportunities through freelance jobs. The platform will connect all standard job positions and freelance projects, enabling users to find opportunities that best match their skills, needs, and available time.

## Worker Profile Demonstration
https://github.com/user-attachments/assets/02a148ab-d48b-4c88-b634-2f52bde7fcb5

## Verify Email Video
https://github.com/user-attachments/assets/d6dd38f6-f8b1-462c-94a9-ab0b78b7949e

## Features

The web application will have **three types of users**: **Administrator**, **Employer**, and **Worker**. Below is a breakdown of the functionalities available for each user type:

### General Features (Available to All Users)

- **Account Registration**:
  - Users can register a new account by providing their **email** and **password**.
  - During registration, users will have the option to choose whether they want to register as a **Worker** or as an **Employer**. 
    - **Worker**: If selected, the user will be able to search and apply for jobs, create and update a **Digital CV**, and send applications for positions.
    - **Employer**: If selected, the user will be able to post job listings, manage applications from workers, and review and select applicants for jobs.

- **Login & Logout**:
  - Users can log in to their accounts using their credentials and log out when they are done.

### Administrator Features

The **Administrator** has control over the content and management of the platform:

- **Content Management**:
  - Review and delete inappropriate job listings.
  
- **Application Statistics**:
  - View total number of job listings.
  - View total number of registered users.
  
- **User Management**:
  - View the list of all users (Employers and Workers).
  - Deactivate user accounts if necessary.

---

### Worker Features

A **Worker** can search and apply for job opportunities through the platform:

- **Job Search**:
  - Filter jobs by categories, location, or search by job title.
  
- **Sending Offers**:
  - Submit applications (offers) for job listings, including a personalized message to the employer.
  
- **Application Status & Overview**:
  - **Sent**: Application has been sent and is waiting for a response.
  - **Accepted**: Application has been approved by the employer, and the worker has received further instructions.
  - **Rejected**: Application was not accepted by the employer.
  
- **Digital CV**:
  - **Workers** will have the ability to create and update their **Digital CV** directly on the platform. The CV will include:
    - Personal information (name, contact info, etc.)
    - Education details
    - Work experience
    - Skills
    - Certifications
    - Additional information (languages spoken)
  
- The **Digital CV** will be used to generate a personalized profile for each user. When a worker applies for a job, this profile will be sent along with their application, providing employers with a comprehensive overview of the worker's qualifications and experience.

### Employer Features

An **Employer** has the ability to manage job postings and worker applications:

- **View Jobs & Applications**:
  - See a list of all published job listings and the applications received from workers.
  
- **Create & Delete Job Listings**:
  - Add new job postings with details such as job title, description, location, and required skills.
  - Remove job listings that are no longer relevant.
  
- **Manage Applications**:
  - **Change Application Status**:
    - **Accepted**: The worker has been chosen for the job.
    - **Rejected**: The worker’s application has been declined.

      
## Technologies Used
- Figma
- Spring Boot
- JavaScript (JS)
- React.js
- Tailwind CSS
- PostgreSql
- Docker
- Flyway
