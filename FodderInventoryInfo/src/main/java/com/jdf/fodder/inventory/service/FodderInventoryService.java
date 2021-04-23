package com.jdf.fodder.inventory.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jdf.fodder.inventory.model.FodderInventoryModel;
import com.jdf.fodder.inventory.repository.FodderInventoryRepository;

@Service
public class FodderInventoryService {

	@Autowired
	private FodderInventoryRepository repository;

	public List<FodderInventoryModel> getAllFodderInventories() {
		List<FodderInventoryModel> list = new ArrayList<FodderInventoryModel>();
		repository.findAll().forEach(fodderInventory -> list.add(fodderInventory));
		return list;
	}

	public FodderInventoryModel getFodderInventoryById(long id) {
		return repository.findById(id).get();
	}
	

	public FodderInventoryModel saveOrUpdateFodderInventory(FodderInventoryModel fodderInventory) {
		return repository.save(fodderInventory);
	}

	public void deleteFodderInventorById(long id) {
		repository.deleteById(id);
	}
	
	public void deleteAllFodderInventories() {
		repository.deleteAll();
	}

	public void updateFodderInventory(FodderInventoryModel fodderInventory) {
		repository.save(fodderInventory);
	}

	public FodderInventoryModel applyPatchToFodderInventory(FodderInventoryModel patch, FodderInventoryModel fodderInventory) {
		if (patch.getDeliveryCharges() != 0) {
			fodderInventory.setDeliveryCharges(patch.getDeliveryCharges());
		}
		if (patch.getFodderType() != null) {
			fodderInventory.setFodderType(patch.getFodderType());
		}
		if (patch.getFodderVariety() != null) {
			fodderInventory.setFodderVariety(patch.getFodderVariety());
		}
		if (patch.getLabourCharges() != 0) {
			fodderInventory.setLabourCharges(patch.getLabourCharges());
		}
		if (patch.getPricePerUnit() != 0) {
			fodderInventory.setPricePerUnit(patch.getPricePerUnit());
		}
		if (patch.getPurchasedDate() != null) {
			fodderInventory.setPurchasedDate(patch.getPurchasedDate());
		}
		if (patch.getQuantityPerUnit() != 0) {
			fodderInventory.setQuantityPerUnit(patch.getQuantityPerUnit());
		}
		if (patch.getTotalCostPerPurchase() != 0) {
			fodderInventory.setTotalCostPerPurchase(patch.getTotalCostPerPurchase());
		}
		if (patch.getTotalQuantity() != 0) {
			fodderInventory.setTotalQuantity(patch.getTotalQuantity());
		}
		if (patch.getTransportationCharges() != 0) {
			fodderInventory.setTransportationCharges(patch.getTransportationCharges());
		}
		if (patch.getUnits() != null) {
			fodderInventory.setUnits(patch.getUnits());
		}
		return fodderInventory;
	}

}
