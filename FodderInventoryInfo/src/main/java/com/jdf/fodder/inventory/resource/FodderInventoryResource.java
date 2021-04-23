package com.jdf.fodder.inventory.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jdf.fodder.inventory.model.FodderInventoryModel;
import com.jdf.fodder.inventory.service.FodderInventoryService;

@RestController
@RequestMapping("/api/v1/fodder-inventory")
public class FodderInventoryResource {

	@Autowired
	private FodderInventoryService service;

	@GetMapping(path = "/")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<FodderInventoryModel>> getAllFodderInventories() {
		try {
			List<FodderInventoryModel> list;
			list = service.getAllFodderInventories();
			if (list.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<List<FodderInventoryModel>>(list, new HttpHeaders(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping(path = "/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<FodderInventoryModel> getFodderInventoryById(@PathVariable("id") long id) {
		FodderInventoryModel cattle = service.getFodderInventoryById(id);
		if (cattle != null) {
			return new ResponseEntity<>(cattle, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

//	 POST is typically used for resource creation while PUT is used for resource updates.
	@PostMapping(path = "/")
	@CrossOrigin(origins = "http://localhost:4200")
	private ResponseEntity<FodderInventoryModel> saveOrUpdateFodderInventory(@RequestBody FodderInventoryModel cattleData) {
		try {
			FodderInventoryModel cattle = service.saveOrUpdateFodderInventory(cattleData);
			return new ResponseEntity<>(cattle, HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

//	creating put mapping that updates the full order detail
	@RequestMapping(path = "/{id}", method = { RequestMethod.PATCH, RequestMethod.PUT })
	@CrossOrigin(origins = "http://localhost:4200")
	private ResponseEntity<FodderInventoryModel> updateFodderInventory(@PathVariable("id") long id, @RequestBody FodderInventoryModel patch) {
		FodderInventoryModel fodderInventory = service.getFodderInventoryById(id);
		if (fodderInventory != null) {
			fodderInventory = service.saveOrUpdateFodderInventory(service.applyPatchToFodderInventory(patch, fodderInventory));
			return new ResponseEntity<>(fodderInventory, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(path = "/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	private ResponseEntity<HttpStatus> deleteFodderInventorById(@PathVariable("id") long id) {
		try {

			FodderInventoryModel fodderInventory = service.getFodderInventoryById(id);
			if (fodderInventory != null) {
				service.deleteFodderInventorById(fodderInventory.getFodderInventoryId());
				return new ResponseEntity<>(HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<HttpStatus> deleteAllFodderInventories() {
		try {
			service.deleteAllFodderInventories();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}