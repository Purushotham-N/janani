package com.jdf.customers.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jdf.customers.model.Customer;
import com.jdf.customers.service.CustomerService;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerResource {

	@Autowired
	private CustomerService service;

	@GetMapping(path = "/")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Customer>> getAllCustomers() {
		try {
			List<Customer> list;
			list = service.getAllCustomers();
			if (list.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<List<Customer>>(list, new HttpHeaders(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping(path = "/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Customer> getCustomerById(@PathVariable("id") long id) {
		Customer customer = service.getCustomerById(id);
		if (customer != null) {
			return new ResponseEntity<>(customer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

//	 POST is typically used for resource creation while PUT is used for resource updates.
	@PostMapping(path = "/")
	@CrossOrigin(origins = "http://localhost:4200")
	private ResponseEntity<Customer> saveCustomer(@RequestBody Customer customerData) {
		try {
			Customer customer = service.saveOrUpdate(customerData);
			return new ResponseEntity<>(customer, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

//	creating put mapping that updates the full customer detail
	@RequestMapping(path = "/{id}", method = { RequestMethod.PATCH, RequestMethod.PUT })
	@CrossOrigin(origins = "http://localhost:4200")

	private ResponseEntity<Customer> updateCustomer(@PathVariable("id") long id, @RequestBody Customer patch) {
		Customer customer = service.getCustomerById(id);
		if (customer != null) {
			customer = service.saveOrUpdate(service.applyPatchToCustomer(patch, customer));
			return new ResponseEntity<>(customer, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(path = "/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	private ResponseEntity<HttpStatus> deleteCustomer(@PathVariable("id") long id) {
		try {

			Customer customer = service.getCustomerById(id);
			if (customer != null) {
				service.deleteCustomerById(customer.getCustomerId());
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
	public ResponseEntity<HttpStatus> deleteAllCustomers() {
		try {
			service.deleteAllCustomers();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}