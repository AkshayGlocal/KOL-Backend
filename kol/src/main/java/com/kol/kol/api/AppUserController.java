package com.kol.kol.api;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.management.RuntimeErrorException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kol.kol.model.AppUser;
import com.kol.kol.model.RequestProfile;
import com.kol.kol.model.Role;
import com.kol.kol.service.AppUserService;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping(path="/api/v1")
public class AppUserController {
    private final AppUserService appUserService;
    
    @GetMapping(path = "/users")
    public ResponseEntity<List<AppUser>>getUsers(){
        return ResponseEntity.ok().body(
            appUserService.getAppUsers()
        );
    }
    @GetMapping(path="/approve")
    public ResponseEntity<?> ApproveRequestProfile(@RequestParam("token") String token){
       int n= appUserService.updateApprovedAtToken(token);
       log.info("int->{}",n);
       return ResponseEntity.ok().build();
    }



    @PostMapping(path="/profile/request")
    public void RequestProfile(@RequestBody RequestProfile requestProfile){
        log.info("in controller");
        String token = UUID.randomUUID().toString();
        requestProfile.setToken(token);
        appUserService.saveRequestProfile(requestProfile);
    }

    @PostMapping(path = "/user/save")
    public ResponseEntity<AppUser>saveUser(
        @RequestBody AppUser appUser
    ){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/user/save").toUriString());

        return ResponseEntity.created(uri).body(
            appUserService.saveAppUser(appUser)
        );
    }
    @PostMapping(path = "/role/save")
    public ResponseEntity<Role>saveRole(
        @RequestBody Role role
    ){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/role/save").toUriString());

        return ResponseEntity.created(uri).body(
           appUserService.saveRole(role)
        );
    }
    @PostMapping(path = "/role/addtouser")
    public ResponseEntity<?>saveRoleToUser(
        @RequestBody RoleToAppUserform roleToAppUserform
    ){
        appUserService.addRoleToAppUser(roleToAppUserform.getUseremail(), roleToAppUserform.getRolename());
        return ResponseEntity.ok().build();
    }
    @GetMapping(path="/eg")
    public String testing(){
        return "Checking ROLE only ADMIN can view";
    }
    @GetMapping(path = "/refresh/token")
    public void RefreshToken(
        HttpServletRequest request, HttpServletResponse response
    )throws ServletException, IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader !=null && authorizationHeader.startsWith("Bearer ")){
            try {
                String refresh_token=authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("2G/pe/o+APbIKXtZHBHem/15fDvr9rLT+5dqvKh/Qz4=".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                AppUser appUser = appUserService.getAppUser(username);
                String access_token = JWT.create()
                .withSubject(appUser.getEmail())
                //2 months -> 87602
                .withExpiresAt(new Date(System.currentTimeMillis()+87602*60*1000))
                .withIssuer(request.getRequestURI().toString())
                .withClaim("roles", appUser.getRoles().stream().
                map(Role::getName).collect(Collectors.toList()))
                .sign(algorithm);
            
            response.setHeader("access_token",access_token);
            response.setHeader("refresh_token", refresh_token);
            Map<String,String> tokens = new HashMap<>();
            tokens.put("access_token",access_token);
            tokens.put("refresh_token",refresh_token);
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(), tokens);
                
            } catch (Exception exception) {
                log.error("Error logging in: {}",exception.getMessage());
                response.setHeader("error",exception.getMessage());
                response.setStatus(FORBIDDEN.value());
               // response.sendError(FORBIDDEN.value());
               //  response.setContentType(APPLICATION_JSON_VALUE);
                Map<String,String> error = new HashMap<>();
                error.put("Error-> ",exception.getMessage());
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }    
        }else{
            throw new RuntimeException("Refresh token is missing");

        }
    }

   
}
@Data
class RoleToAppUserform{
    private String useremail;
    private String rolename;
}

