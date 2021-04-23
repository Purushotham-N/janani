package com.jdf.fodder.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.jdf.fodder.inventory.model.FodderInventoryModel;

@RepositoryRestResource(collectionResourceRel = "fodder_inventory", path = "fodder_inventory")
public interface FodderInventoryRepository extends JpaRepository<FodderInventoryModel, Long> {
}