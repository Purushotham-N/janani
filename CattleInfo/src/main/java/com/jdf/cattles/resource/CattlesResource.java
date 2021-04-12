package com.jdf.cattles.resource;

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

import com.jdf.cattles.model.CattleModel;
import com.jdf.cattles.service.CattleService;

@RestController
@RequestMapping("/api/v1/cattles")
public class CattlesResource {

	@Autowired
	private CattleService service;

	@GetMapping(path = "/")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<CattleModel>> getAllcattles() {
		try {
			List<CattleModel> list;
			list = service.getAllCattles();
			if (list.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<List<CattleModel>>(list, new HttpHeaders(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping(path = "/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<CattleModel> getCattleById(@PathVariable("id") long id) {
		CattleModel cattle = service.getCattleById(id);
		if (cattle != null) {
			return new ResponseEntity<>(cattle, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

//	 POST is typically used for resource creation while PUT is used for resource updates.
	@PostMapping(path = "/")
	@CrossOrigin(origins = "http://localhost:4200")
	private ResponseEntity<CattleModel> saveCattle(@RequestBody CattleModel cattleData) {
		try {
			CattleModel cattle = service.saveOrUpdate(cattleData);
			return new ResponseEntity<>(cattle, HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

//	creating put mapping that updates the full order detail
	@RequestMapping(path = "/{id}", method = { RequestMethod.PATCH, RequestMethod.PUT })
	@CrossOrigin(origins = "http://localhost:4200")
	private ResponseEntity<CattleModel> updateCattle(@PathVariable("id") long id, @RequestBody CattleModel patch) {
		CattleModel cattle = service.getCattleById(id);
		if (cattle != null) {
			cattle = service.saveOrUpdate(service.applyPatchToCattle(patch, cattle));
			return new ResponseEntity<>(cattle, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(path = "/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	private ResponseEntity<HttpStatus> deleteCattle(@PathVariable("id") long id) {
		try {

			CattleModel cattle = service.getCattleById(id);
			if (cattle != null) {
				service.deleteCattleById(cattle.getCattleId());
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
	public ResponseEntity<HttpStatus> deleteAllcattles() {
		try {
			service.deleteAllCattles();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}