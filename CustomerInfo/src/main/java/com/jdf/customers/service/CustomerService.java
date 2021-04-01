package com.jdf.customers.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jdf.customers.model.Customer;
import com.jdf.customers.repository.CustomerRepository;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository repository;

	public List<Customer> getAllCustomers() {
		List<Customer> list = new ArrayList<Customer>();
		repository.findAll().forEach(customer -> list.add(customer));
		return list;
	}

	public Customer getCustomerById(long id) {
		return repository.findById(id).get();
	}
	

	public Customer saveOrUpdate(Customer customer) {
		return repository.save(customer);

	}

	public void deleteCustomerById(long id) {
		repository.deleteById(id);
	}
	
	public void deleteAllCustomers() {
		repository.deleteAll();
	}

	public void updateCustomer(Customer customer) {
		repository.save(customer);
	}

	public Customer applyPatchToCustomer(Customer patch, Customer customer) {
		if (patch.getFirstName() != null) {
			customer.setFirstName(patch.getFirstName());
		}
		if (patch.getLastName() != null) {
			customer.setLastName(patch.getLastName());
		}
		if (patch.getMobileNo() != null) {
			customer.setMobileNo(patch.getMobileNo());
		}
		if (patch.getWhatsappNo() != null) {
			customer.setWhatsappNo(patch.getWhatsappNo());
		}
		if (patch.getAddress() != null) {
			customer.setAddress(patch.getAddress());
		}
		return customer;
	}

}
