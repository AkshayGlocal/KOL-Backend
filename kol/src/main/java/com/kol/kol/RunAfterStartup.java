package com.kol.kol;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.impossibl.postgres.api.jdbc.PGConnection;
import com.impossibl.postgres.api.jdbc.PGNotificationListener;
import com.impossibl.postgres.jdbc.PGDataSource;

import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import com.fasterxml.jackson.databind.JsonNode;
import javax.sql.DataSource;

import java.nio.charset.StandardCharsets;
import java.sql.Statement;
@Component
public class RunAfterStartup{
    @Autowired
	DataSource datasource;

	@Autowired
	private RestTemplate restTemplate;


@EventListener(ApplicationReadyEvent.class)
public void runAfterStartup() {
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
	
	
}
}
