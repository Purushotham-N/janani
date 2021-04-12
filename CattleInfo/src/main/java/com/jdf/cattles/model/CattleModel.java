package com.jdf.cattles.model;



import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

@Entity
@Table(name = "cattles")
public class CattleModel {
	CattleModel() {
	}

	@Id
	@Column(name = "cattle_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long cattleId;

	@Column(name = "cattle_type")
	@NotNull
	private CattleType cattleType;// enum

	@Column(name = "cattle_breed")
	private CattleBreed breed;// enum

	@Column(name = "age")
	@NotNull
	private float age;

	@Column(name = "milk_capacity")
	@NotNull
	private float milkCapacity;
	
	@Column(name = "lactation")
	private int lactation;


	@Column(name = "recent_delivery_date")
	private Date deliveryDate;

	@Column(name = "calf_gendar")
	private String calfGendar;

	public long getCattleId() {
		return cattleId;
	}

	public void setCattleId(long cattleId) {
		this.cattleId = cattleId;
	}

	public CattleType getCattleType() {
		return cattleType;
	}

	public void setCattleType(CattleType cattleType) {
		this.cattleType = cattleType;
	}

	public CattleBreed getBreed() {
		return breed;
	}

	public void setBreed(CattleBreed breed) {
		this.breed = breed;
	}

	public float getAge() {
		return age;
	}

	public void setAge(float age) {
		this.age = age;
	}

	public float getMilkCapacity() {
		return milkCapacity;
	}

	public void setMilkCapacity(float milkCapacity) {
		this.milkCapacity = milkCapacity;
	}

	public int getLactation() {
		return lactation;
	}

	public void setLactation(int lactation) {
		this.lactation = lactation;
	}

	public Date getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getCalfGendar() {
		return calfGendar;
	}

	public void setCalfGendar(String calfGendar) {
		this.calfGendar = calfGendar;
	}


}
