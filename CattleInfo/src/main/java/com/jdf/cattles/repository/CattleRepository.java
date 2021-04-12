package com.jdf.cattles.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.jdf.cattles.model.CattleModel;

@RepositoryRestResource(collectionResourceRel = "cattles", path = "cattles")
public interface CattleRepository extends JpaRepository<CattleModel, Long> {
}