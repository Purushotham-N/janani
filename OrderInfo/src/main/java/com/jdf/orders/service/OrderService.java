package com.jdf.orders.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jdf.orders.model.OrderModel;
import com.jdf.orders.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository repository;

	public List<OrderModel> getAllOrders() {
		List<OrderModel> list = new ArrayList<OrderModel>();
		repository.findAll().forEach(customer -> list.add(customer));
		return list;
	}

	public OrderModel getOrderById(long id) {
		return repository.findById(id).get();
	}
	

	public OrderModel saveOrUpdate(OrderModel order) {
		return repository.save(order);
	}

	public void deleteOrderById(long id) {
		repository.deleteById(id);
	}
	
	public void deleteAllOrders() {
		repository.deleteAll();
	}

	public void updateOrder(OrderModel order) {
		repository.save(order);
	}

	public OrderModel applyPatchToOrder(OrderModel patch, OrderModel order) {
		if (patch.getOrderDate() != null) {
			order.setOrderDate(patch.getOrderDate());
		}
		if (patch.getActualDOD() != null) {
			order.setActualDOD(patch.getActualDOD());
		}
		if (patch.getExpectedDOD() != null) {
			order.setExpectedDOD(patch.getExpectedDOD());
		}
		if (patch.getMilkType() != null) {
			order.setMilkType(patch.getMilkType());
		}
		if (patch.getShift() != null) {
			order.setShift(patch.getShift());
		}
		if (patch.getDemandQuantity() != 0.0) {
			order.setDemandQuantity(patch.getDemandQuantity());
		}
		if (patch.getSupplyQuantity() != 0.0) {
			order.setSupplyQuantity(patch.getSupplyQuantity());
		}
		if (patch.getCustomerId() != 0) {
			order.setCustomerId(patch.getCustomerId());
		}
		return order;
	}

}
