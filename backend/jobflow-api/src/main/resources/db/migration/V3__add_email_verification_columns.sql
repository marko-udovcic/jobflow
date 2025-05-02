ALTER TABLE app_user
ADD COLUMN verification_token VARCHAR(255),
ADD COLUMN verification_token_expiry_date TIMESTAMP;