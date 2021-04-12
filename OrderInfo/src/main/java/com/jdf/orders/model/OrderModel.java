package com.jdf.orders.model;



import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

@Entity
@Table(name = "order_details")
public class OrderModel {
	OrderModel() {
	}

	@Id
	@Column(name = "order_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long orderId;

	@Column(name = "products")
	private Products products;// enum

	@Column(name = "shifts")
	private Shifts shifts;// enum

	@Column(name = "demand_quantity")
	@NotNull
	private float demandQuantity;

	@Column(name = "supply_quantity")
	@NotNull
	private float supplyQuantity;
	
	@Column(name = "order_date")
	private Date orderDate;

//	 DOD - date of delivery
	@Column(name = "expected_dod")
	private Date expectedDOD;

	@Column(name = "actual_dod")
	private Date actualDOD;

//	 customers table's pk, here fk
	@Column(name = "customer_id") 
	@NotNull
	private long customerId;

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public Products getProducts() {
		return products;
	}

	public void setProducts(Products products) {
		this.products = products;
	}

	public Shifts getShifts() {
		return shifts;
	}

	public void setShifts(Shifts shifts) {
		this.shifts = shifts;
	}

	public float getDemandQuantity() {
		return demandQuantity;
	}

	public void setDemandQuantity(float demandQuantity) {
		this.demandQuantity = demandQuantity;
	}

	public float getSupplyQuantity() {
		return supplyQuantity;
	}

	public void setSupplyQuantity(float supplyQuantity) {
		this.supplyQuantity = supplyQuantity;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Date getExpectedDOD() {
		return expectedDOD;
	}

	public void setExpectedDOD(Date expectedDOD) {
		this.expectedDOD = expectedDOD;
	}

	public Date getActualDOD() {
		return actualDOD;
	}

	public void setActualDOD(Date actualDOD) {
		this.actualDOD = actualDOD;
	}

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

}
