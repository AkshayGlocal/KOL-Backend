package com.kol.kol.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;

@Entity 
@Data 
@NoArgsConstructor 
@AllArgsConstructor
public class RequestProfile {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String createdAt;
    private String kolProfileId;


    public RequestProfile(String username, String createdAt, String kolProfileId) {
        this.username = username;
        this.createdAt = createdAt;
        this.kolProfileId = kolProfileId;
    }

    
}
