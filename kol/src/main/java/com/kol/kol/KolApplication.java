package com.kol.kol;

import java.nio.charset.StandardCharsets;
import java.sql.Statement;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.fasterxml.jackson.databind.JsonNode;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.web.client.RestTemplate;

import com.kol.kol.model.AppUser;
import com.kol.kol.model.Role;
import com.kol.kol.service.AppUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.impossibl.postgres.api.jdbc.PGConnection;
import com.impossibl.postgres.api.jdbc.PGNotificationListener;
import com.impossibl.postgres.jdbc.PGDataSource;


@SpringBootApplication
public class KolApplication {

	@Autowired
	DataSource datasource;

	@Autowired
	private RestTemplate restTemplate;

	public static void main(String[] args) {
		SpringApplication.run(KolApplication.class, args);
	}
	

	@Bean
	CommandLineRunner run(AppUserService appUserService){
		return args->{
			appUserService.saveRole(new Role(null,"ROLE_ANALYST"));
			appUserService.saveRole(new Role(null,"ROLE_ADMIN"));
			appUserService.saveRole(new Role(null,"ROLE_SUPER_ADMIN"));

			appUserService.saveAppUser(new AppUser(null,"akshay","akshay.a@glocalmind.com","glocalmind",new ArrayList<>()));
			appUserService.saveAppUser(new AppUser(null,"suraj","suraj.s@glocalmind.com","glocalmind",new ArrayList<>()));
			appUserService.saveAppUser(new AppUser(null,"deepak","deepak.b@glocalmind.com","glocalmind",new ArrayList<>()));
			appUserService.saveAppUser(new AppUser(null,"johnsmith","johnsmith@glocalmind.com","glocalmind",new ArrayList<>()));

			appUserService.addRoleToAppUser("akshay.a@glocalmind.com", "ROLE_SUPER_ADMIN");
			appUserService.addRoleToAppUser("suraj.s@glocalmind.com", "ROLE_ADMIN");
			appUserService.addRoleToAppUser("deepak.b@glocalmind.com", "ROLE_ADMIN");
	 		appUserService.addRoleToAppUser("johnsmith@glocalmind.com", "ROLE_ANALYST");

			ResourceDatabasePopulator triggerPopulator = new ResourceDatabasePopulator(false, false, StandardCharsets.UTF_8.toString(),
			 new ClassPathResource("triggers.sql"));
			triggerPopulator.setSeparator("//");
			triggerPopulator.execute(datasource);

			PGDataSource dataSource = new PGDataSource();
			dataSource.setHost("localhost");
			dataSource.setPort(5432);
			dataSource.setDatabaseName("kol");
			dataSource.setUser("postgres");
			dataSource.setPassword("root");
			
			PGNotificationListener listener = new PGNotificationListener() {
	
				@Override
				public void notification(int processId, String channelName, String payload) {
					System.out.println("notifications: " + payload);
					ObjectMapper mapper = new ObjectMapper();
					
					try{
						JsonNode payload_json = mapper.readTree(payload);
						String kol_id = payload_json.get("kol_profile_id").asText();
						System.out.println("Profile-> "+kol_id);
						restTemplate.postForEntity("http://localhost:8080/api/v1/profile/approved",kol_id,String.class);


						System.out.println("profile approved sent to api");

					}catch(Exception e){
						System.out.println(e);
					}

				}
			};
			
			try (PGConnection connection = (PGConnection) dataSource.getConnection()){
				Statement statement = connection.createStatement();
				statement.execute("LISTEN update_notification");
				statement.close();
				connection.addNotificationListener(listener);
	
				while (true){ }
			} catch (Exception e) {
				System.err.println(e);
			}
	
	
		};
	}
	
}
