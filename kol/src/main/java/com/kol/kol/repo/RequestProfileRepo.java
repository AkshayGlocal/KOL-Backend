package com.kol.kol.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kol.kol.model.RequestProfile;


@Repository
public interface RequestProfileRepo extends JpaRepository<RequestProfile,Long>{
    RequestProfile findByUsername(String username);
}
