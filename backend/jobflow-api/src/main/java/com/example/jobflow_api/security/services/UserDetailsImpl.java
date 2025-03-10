package com.example.jobflow_api.security.services;

import com.example.jobflow_api.models.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@Data
public class UserDetailsImpl implements UserDetails {
    @Getter
    private String id;
    @Getter
    private String email;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public static UserDetailsImpl build(AppUser user) {
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().name());

        UserDetailsImpl userDetails = new UserDetailsImpl();
        userDetails.id = user.getId();
        userDetails.email = user.getEmail();
        userDetails.password = user.getPassword();
        userDetails.authorities = List.of(authority);

        return userDetails;
    }

    public UserDetailsImpl(String id, String email, String password,
                           Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

}
