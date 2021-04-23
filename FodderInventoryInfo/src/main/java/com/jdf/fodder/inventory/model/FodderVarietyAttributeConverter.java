package com.jdf.fodder.inventory.model;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class FodderVarietyAttributeConverter implements AttributeConverter<FodderVariety, Integer> {

	@Override
	public Integer convertToDatabaseColumn(FodderVariety attribute) {
		System.out.println("FodderVariety - convertToDatabaseColumn called: attrubute:" + attribute);
		if (attribute == null)
			return null;

		switch (attribute) {
		case HAY:
			return 1;

		case STRAW:
			return 2;

		case LEGUMINOUS:
			return 3;

		case NONLEGUMINOUS:
			return 4;

		case SILAGE:
			return 5;

		case ROUGHAGE:
			return 6;

		default:
			throw new IllegalArgumentException(attribute + " not supported.");
		}
	}

	@Override
	public FodderVariety convertToEntityAttribute(Integer dbData) {
		System.out.println("FodderVariety - convertToEntityAttribute called: attrubute:" + dbData);
		if (dbData == null)
			return null;
		switch (dbData) {
		case 1:
			return FodderVariety.HAY;

		case 2:
			return FodderVariety.STRAW;

		case 3:
			return FodderVariety.LEGUMINOUS;

		case 4:
			return FodderVariety.NONLEGUMINOUS;

		case 5:
			return FodderVariety.SILAGE;

		case 6:
			return FodderVariety.ROUGHAGE;

		default:
			throw new IllegalArgumentException(dbData + " not supported.");
		}
	}

}
