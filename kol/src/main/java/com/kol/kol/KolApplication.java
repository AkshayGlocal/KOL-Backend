package com.kol.kol;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.kol.kol.model.AppUser;
import com.kol.kol.model.Role;
import com.kol.kol.service.AppUserService;

@SpringBootApplication
public class KolApplication {

	public static void main(String[] args) {
		SpringApplication.run(KolApplication.class, args);
	}

	@Bean
	CommandLineRunner run(AppUserService appUserService){
		return args->{
			appUserService.saveRole(new Role(null,"ROLE_ANALYST"));
			appUserService.saveRole(new Role(null,"ROLE_ADMIN"));
			appUserService.saveRole(new Role(null,"ROLE_SUPER_ADMIN"));

			appUserService.saveAppUser(new AppUser(null,"akshay","akshay.a@glocalmind.com","pass",new ArrayList<>()));
			appUserService.saveAppUser(new AppUser(null,"suraj","suraj.sharma@glocalmind.com","pass",new ArrayList<>()));
			appUserService.saveAppUser(new AppUser(null,"deepak","deepak.b@glocalmind.com","pass",new ArrayList<>()));

			appUserService.addRoleToAppUser("akshay.a@glocalmind.com", "ROLE_SUPER_ADMIN");
			appUserService.addRoleToAppUser("suraj.sharma@glocalmind.com", "ROLE_ANALYST");
			appUserService.addRoleToAppUser("deepak.b@glocalmind.com", "ROLE_ADMIN");
		};
	}
}
