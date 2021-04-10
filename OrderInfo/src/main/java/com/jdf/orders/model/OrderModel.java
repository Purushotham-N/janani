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

	@Column(name = "order_date")
	private Date orderDate;

	@Column(name = "milk_type")
	private MilkType milkType;// enum

	@Column(name = "shift")
	private Shift shift;// enum

	@Column(name = "demand_quantity")
	@NotNull
	private float demandQuantity;

	@Column(name = "supply_quantity")
	@NotNull
	private float supplyQuantity;

	@Column(name = "expected_dod") // dod - date of delivery
	private Date expectedDOD;

	@Column(name = "actual_dod") // dod - date of delivery
	private Date actualDOD;

	@Column(name = "customer_id") // customers table's pk, here fk
	@NotNull
	private long customerId;

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
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

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
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

	public MilkType getMilkType() {
		return milkType;
	}

	public void setMilkType(MilkType milkType) {
		this.milkType = milkType;
	}

	public Shift getShift() {
		return shift;
	}

	public void setShift(Shift shift) {
		this.shift = shift;
	}

}
