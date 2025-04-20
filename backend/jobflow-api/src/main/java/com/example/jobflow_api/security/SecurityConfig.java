package com.example.jobflow_api.security;

import com.example.jobflow_api.security.jwt.AuthEntryPointJwt;
import com.example.jobflow_api.security.jwt.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
          http.cors(cors -> cors.configurationSource(corsConfigurationSource));
//        http.csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                .ignoringRequestMatchers("/api/auth/public/**",
//                        "/swagger-ui.html",
//                        "/swagger-ui/**",
//                        "/v2/api-docs",
//                        "/v3/api-docs",
//                        "/v3/api-docs/**"
//
//                ));
        http.csrf(AbstractHttpConfigurer::disable);
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers("/api/csrf-token").permitAll()
                .requestMatchers("/api/auth/public/login").permitAll()
                .requestMatchers("/api/auth/public/**",
                        "/swagger-ui.html",
                        "/swagger-ui/**",
                        "/v2/api-docs",
                        "/v3/api-docs",
                        "/v3/api-docs/**"
                ).permitAll()
                .anyRequest().authenticated());

        http.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler));
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);


        return (SecurityFilterChain) http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

