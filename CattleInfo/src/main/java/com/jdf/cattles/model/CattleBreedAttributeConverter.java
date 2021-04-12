package com.jdf.cattles.model;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class CattleBreedAttributeConverter implements AttributeConverter<CattleBreed, Integer> {

	@Override
	public Integer convertToDatabaseColumn(CattleBreed attribute) {
		System.out.println("CattleBreed - convertToDatabaseColumn called: attrubute:" + attribute);
		if (attribute == null)
			return null;

		switch (attribute) {
		case JERSY:
			return 1;

		case HOLSTEIN_FRIESIAN:
			return 2;

		case GIR:
			return 3;

		case SAHIWAL:
			return 4;

		case RED_SINDHI:
			return 5;

		case THARPARKAR:
			return 6;

		case ONGOLE:
			return 7;

		case COUNTRY:
			return 8;

		case MURRAH:
			return 9;

		case JAFRABADI:
			return 10;

		case BANNI:
			return 11;

		default:
			throw new IllegalArgumentException(attribute + " not supported.");
		}
	}

	@Override
	public CattleBreed convertToEntityAttribute(Integer dbData) {
		System.out.println("CattleBreed - convertToEntityAttribute called: attrubute:" + dbData);
		if (dbData == null)
			return null;
		switch (dbData) {
		case 1:
			return CattleBreed.JERSY;

		case 2:
			return CattleBreed.HOLSTEIN_FRIESIAN;

		case 3:
			return CattleBreed.GIR;

		case 4:
			return CattleBreed.SAHIWAL;

		case 5:
			return CattleBreed.RED_SINDHI;

		case 6:
			return CattleBreed.THARPARKAR;

		case 7:
			return CattleBreed.ONGOLE;

		case 8:
			return CattleBreed.COUNTRY;

		case 9:
			return CattleBreed.MURRAH;

		case 10:
			return CattleBreed.JAFRABADI;

		case 11:
			return CattleBreed.BANNI;

		default:
			throw new IllegalArgumentException(dbData + " not supported.");
		}
	}

}
