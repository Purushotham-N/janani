package com.jdf.fodder.inventory.model;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class UnitsAttributeConverter implements AttributeConverter<Units, Integer> {

	@Override
	public Integer convertToDatabaseColumn(Units attribute) {
		System.out.println("Units - convertToDatabaseColumn called: attrubute:" + attribute);
		if (attribute == null)
			return null;

		switch (attribute) {
		case KG:
			return 1;

		case QUINTAL:
			return 2;

		case TONNNE:
			return 3;

		case TRUCK_LOAD:
			return 4;

		case LORRY_LOAD:
			return 5;

		default:
			throw new IllegalArgumentException(attribute + " not supported.");
		}
	}

	@Override
	public Units convertToEntityAttribute(Integer dbData) {
		System.out.println("Units - convertToEntityAttribute called: attrubute:" + dbData);
		if (dbData == null)
			return null;
		switch (dbData) {
		case 1:
			return Units.KG;

		case 2:
			return Units.QUINTAL;

		case 3:
			return Units.TONNNE;

		case 4:
			return Units.TRUCK_LOAD;

		case 5:
			return Units.LORRY_LOAD;

		default:
			throw new IllegalArgumentException(dbData + " not supported.");
		}
	}

}
