package com.jdf.orders.resource;

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

import com.jdf.orders.model.OrderModel;
import com.jdf.orders.service.OrderService;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderResource {

	@Autowired
	private OrderService service;

	@GetMapping(path = "/")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<OrderModel>> getAllOrders() {
		try {
			List<OrderModel> list;
			list = service.getAllOrders();
			if (list.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<List<OrderModel>>(list, new HttpHeaders(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping(path = "/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<OrderModel> getOrderById(@PathVariable("id") long id) {
		OrderModel order = service.getOrderById(id);
		if (order != null) {
			return new ResponseEntity<>(order, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

//	 POST is typically used for resource creation while PUT is used for resource updates.
	@PostMapping(path = "/")
	@CrossOrigin(origins = "http://localhost:4200")
	private ResponseEntity<OrderModel> saveOrder(@RequestBody OrderModel orderData) {
		try {
			OrderModel order = service.saveOrUpdate(orderData);
			return new ResponseEntity<>(order, HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

//	creating put mapping that updates the full order detail
	@RequestMapping(path = "/{id}", method = { RequestMethod.PATCH, RequestMethod.PUT })
	@CrossOrigin(origins = "http://localhost:4200")
	private ResponseEntity<OrderModel> updateOrder(@PathVariable("id") long id, @RequestBody OrderModel patch) {
		OrderModel order = service.getOrderById(id);
		if (order != null) {
			order = service.saveOrUpdate(service.applyPatchToOrder(patch, order));
			return new ResponseEntity<>(order, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(path = "/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	private ResponseEntity<HttpStatus> deleteOrder(@PathVariable("id") long id) {
		try {

			OrderModel order = service.getOrderById(id);
			if (order != null) {
				service.deleteOrderById(order.getOrderId());
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
	public ResponseEntity<HttpStatus> deleteAllOrders() {
		try {
			service.deleteAllOrders();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}