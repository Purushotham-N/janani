package com.jdf.cattles.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jdf.cattles.model.CattleModel;
import com.jdf.cattles.repository.CattleRepository;

@Service
public class CattleService {

	@Autowired
	private CattleRepository repository;

	public List<CattleModel> getAllCattles() {
		List<CattleModel> list = new ArrayList<CattleModel>();
		repository.findAll().forEach(cattle -> list.add(cattle));
		return list;
	}

	public CattleModel getCattleById(long id) {
		return repository.findById(id).get();
	}
	

	public CattleModel saveOrUpdate(CattleModel cattle) {
		return repository.save(cattle);
	}

	public void deleteCattleById(long id) {
		repository.deleteById(id);
	}
	
	public void deleteAllCattles() {
		repository.deleteAll();
	}

	public void updateCattle(CattleModel cattle) {
		repository.save(cattle);
	}

	public CattleModel applyPatchToCattle(CattleModel patch, CattleModel cattle) {
		if (patch.getAge() != 0) {
			cattle.setAge(patch.getAge());
		}
		if (patch.getSex() != null) {
			cattle.setSex(patch.getSex());
		}
		if (patch.getCattleType() != null) {
			cattle.setCattleType(patch.getCattleType());
		}
		if (patch.getCattleBreed() != null) {
			cattle.setCattleBreed(patch.getCattleBreed());
		}
		if (patch.getDeliveryDate() != null) {
			cattle.setDeliveryDate(patch.getDeliveryDate());
		}
		if (patch.getLactation() != 0) {
			cattle.setLactation(patch.getLactation());
		}
		if (patch.getMilkCapacity() != 0.0) {
			cattle.setMilkCapacity(patch.getMilkCapacity());
		}
		return cattle;
	}

}
