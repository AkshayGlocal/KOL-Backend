package com.kol.kol.Registration;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Setter

public class RegistraionRequest {
    private final String username;
    private final String email;
    private final String password;

    
}
