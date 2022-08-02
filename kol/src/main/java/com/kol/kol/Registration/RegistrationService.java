package com.kol.kol.Registration;

import org.springframework.stereotype.Service;

import com.kol.kol.AppUser.AppUser;
import com.kol.kol.AppUser.AppUserRole;
import com.kol.kol.AppUser.AppUserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;

    public String register(RegistraionRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if(!isValidEmail){
            throw new IllegalStateException("email not valid");
        }

        return appUserService.signUpUser(
            new AppUser(
            request.getUsername(),
            request.getEmail(),
            request.getPassword(),
            AppUserRole.ANALYST
            )
            
        );
    }
    
}
