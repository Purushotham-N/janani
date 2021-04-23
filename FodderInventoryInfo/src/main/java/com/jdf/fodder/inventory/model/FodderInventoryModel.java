package com.jdf.fodder.inventory.model;




import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

@Entity
@Table(name = "fodder_inventory")
public class FodderInventoryModel {
//	default constructor
	FodderInventoryModel() {
	}

	@Id
	@Column(name = "fodder_inventory_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long fodderInventoryId;

	@Column(name = "fodder_type")
	@NotNull
	private FodderType fodderType;// enum

	@Column(name = "fodder_variety")
	private FodderVariety fodderVariety;// enum

	@Column(name = "quantity_per_unit")
	@NotNull
	private int quantityPerUnit;
	
	@Column(name = "total_quantity")
	@NotNull
	private float totalQuantity;

	@Column(name = "price_per_unit")
	@NotNull
	private float pricePerUnit;
	
	@Column(name = "units")
	private Units units;

	@Column(name = "delivery_charges")
	private float deliveryCharges;
	
	@Column(name = "transportation_charges")
	private float transportationCharges;
	
	@Column(name = "labour_charges")
	private float labourCharges;

	@Column(name = "purchased_date")
	private LocalDateTime purchasedDate;

	@Column(name = "total_cost_per_purchase")
	private float totalCostPerPurchase;

	public long getFodderInventoryId() {
		return fodderInventoryId;
	}

	public void setFodderInventoryId(long fodderInventoryId) {
		this.fodderInventoryId = fodderInventoryId;
	}

	public FodderType getFodderType() {
		return fodderType;
	}

	public void setFodderType(FodderType fodderType) {
		this.fodderType = fodderType;
	}

	public FodderVariety getFodderVariety() {
		return fodderVariety;
	}

	public void setFodderVariety(FodderVariety fodderVariety) {
		this.fodderVariety = fodderVariety;
	}

	public float getPricePerUnit() {
		return pricePerUnit;
	}

	public void setPricePerUnit(float pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}

	public Units getUnits() {
		return units;
	}

	public void setUnits(Units units) {
		this.units = units;
	}

	public float getDeliveryCharges() {
		return deliveryCharges;
	}

	public void setDeliveryCharges(float deliveryCharges) {
		this.deliveryCharges = deliveryCharges;
	}

	public float getTransportationCharges() {
		return transportationCharges;
	}

	public void setTransportationCharges(float transportationCharges) {
		this.transportationCharges = transportationCharges;
	}

	public float getLabourCharges() {
		return labourCharges;
	}

	public void setLabourCharges(float labourCharges) {
		this.labourCharges = labourCharges;
	}

	public LocalDateTime getPurchasedDate() {
		return purchasedDate;
	}

	public void setPurchasedDate(LocalDateTime purchasedDate) {
		this.purchasedDate = purchasedDate;
	}

	public float getTotalCostPerPurchase() {
		return totalCostPerPurchase;
	}

	public void setTotalCostPerPurchase(float totalCostPerPurchase) {
		this.totalCostPerPurchase = totalCostPerPurchase;
	}

	public int getQuantityPerUnit() {
		return quantityPerUnit;
	}

	public void setQuantityPerUnit(int quantityPerUnit) {
		this.quantityPerUnit = quantityPerUnit;
	}

	public float getTotalQuantity() {
		return totalQuantity;
	}

	public void setTotalQuantity(float totalQuantity) {
		this.totalQuantity = totalQuantity;
	}

	
}
