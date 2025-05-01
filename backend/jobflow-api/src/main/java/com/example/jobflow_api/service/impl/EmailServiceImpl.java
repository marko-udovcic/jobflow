package com.example.jobflow_api.service.impl;

import com.example.jobflow_api.models.AppUser;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class EmailServiceImpl {
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.email.from}")
    private String fromEmail;

    @Value("${frontend.url}")
    private String frontendUrl;

    public void sendVerificationEmail(AppUser user) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");


            helper.setFrom(new InternetAddress(fromEmail, "JobFlow"));
            helper.setTo(user.getEmail());
            helper.setSubject("Account Verification");


            String verificationUrl = frontendUrl + "/verify-email?token=" + user.getVerificationToken();

            String htmlContent =
                    "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>" +
                            "<h2 style='color: #333366;'>Account Verification</h2>" +
                            "<p>Dear User,</p>" +
                            "<p>Thank you for registering with our service. To complete your registration, please verify your email address by clicking the button below:</p>" +
                            "<p style='text-align: center;'>" +
                            "  <a href='" + verificationUrl + "' style='display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; " +
                            "text-decoration: none; border-radius: 4px; font-weight: bold;'>Verify Email</a>" +
                            "</p>" +
                            "<p>Alternatively, you can copy and paste the following link into your browser:</p>" +
                            "<p style='word-break: break-all;'><a href='" + verificationUrl + "'>" + verificationUrl + "</a></p>" +
                            "<p><strong>Note:</strong> This link will expire in 24 hours.</p>" +
                            "<p>If you did not request this verification, please ignore this email.</p>" +
                            "<p>Best regards,<br/>Your Application Team</p>" +
                            "</div>";

            helper.setText(htmlContent, true);

            logger.info("Attempting to send email to {} with token {} via host {}",
                    user.getEmail(), user.getVerificationToken(),
                    mailSender.toString());


            mailSender.send(message);
            logger.info("Verification email sent successfully to: {}", user.getEmail());
        } catch (MessagingException e) {
            logger.error("Failed to send verification email to {}: {}", user.getEmail(), e.getMessage());
            throw new RuntimeException("Error sending verification email", e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

}

