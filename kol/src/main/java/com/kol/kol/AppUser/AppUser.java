package com.kol.kol.AppUser;

import java.util.Collection;
import java.util.Collections;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class AppUser implements UserDetails{

    @Id
    @SequenceGenerator(
        name="app_user_sequence",
        sequenceName = "app_user_sequence",
        allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
    generator = "app_user_sequence")
    private long Id;
    private String username;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;
    
    private Boolean locked = false;
    private Boolean enabled = true;
     


    
    public AppUser(String username, String email, String password, AppUserRole appUserRole, Boolean locked,
            Boolean enabled) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.appUserRole = appUserRole;
        this.locked = locked;
        this.enabled = enabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new 
        SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority);

    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public AppUser(String username2, String email2, String password2, AppUserRole analyst) {
        this.username= username2;
        this.email = email2;
        this.password = password2;
        this.appUserRole = analyst;
    }

    

    
    
}
