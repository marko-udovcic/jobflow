CREATE TABLE app_user (
    id VARCHAR(50) NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    company_status VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50),
    company_name VARCHAR(100) NULL,
    about_company TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

CREATE TABLE category (
            id BIGSERIAL NOT NULL,
            category_name VARCHAR(50) NOT NULL,

            PRIMARY KEY (id)
);

CREATE TABLE digital_cv (
    worker_id VARCHAR(50) NOT NULL,
    summary TEXT NULL,
    work_experience TEXT NULL,
    education TEXT NULL,
    personal_skills TEXT NULL,
    computer_skills TEXT NULL,
    other_skills TEXT NULL,
    driving_licence TEXT NULL,
    additional_information TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_of_birth DATE NULL,
    nationality TEXT NULL,

    PRIMARY KEY (worker_id),
    FOREIGN KEY (worker_id) REFERENCES app_user(id) ON DELETE CASCADE
);

CREATE TABLE job_posting (
    id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    salary VARCHAR(20) NULL,
    job_type VARCHAR(50) NULL,
    description TEXT NOT NULL,
    responsibilities TEXT NULL,
    jobs_requirements TEXT NULL,
    posting_date TIMESTAMP NOT NULL,
    employer_id VARCHAR(50) NOT NULL,
    category_id BIGINT NULL,
    location TEXT NOT NULL,
    hourly_rate VARCHAR(20) NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (employer_id) REFERENCES app_user(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL

);

CREATE TABLE job_application (
    id VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    cv_url VARCHAR(255) NULL,
    job_posting_id VARCHAR(50) NOT NULL,
    worker_id VARCHAR(50) NOT NULL,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    application_status VARCHAR(150) NOT NULL,
    job_position VARCHAR(150) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (job_posting_id) REFERENCES job_posting(id) ON DELETE CASCADE,
    FOREIGN KEY (worker_id) REFERENCES app_user(id) ON DELETE CASCADE
);

CREATE TABLE app_message (
    id VARCHAR(50) NOT NULL,
    job_application_id VARCHAR(50) NOT NULL,
    employer_id VARCHAR(50) NOT NULL,
    worker_id VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sender_role VARCHAR(150) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (job_application_id) REFERENCES job_application(id) ON DELETE CASCADE,
    FOREIGN KEY (employer_id) REFERENCES app_user(id) ON DELETE CASCADE,
    FOREIGN KEY (worker_id) REFERENCES app_user(id) ON DELETE CASCADE
);
