package com.jdf.orders.model;


import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class MilkTypeAttributeConverter implements AttributeConverter<MilkType, Integer> {
 
    @Override
    public Integer convertToDatabaseColumn(MilkType attribute) {
    	System.out.println("milkType - convertToDatabaseColumn called");
        if (attribute == null)
            return null;
 
        switch (attribute) {
        case COW_MILK:
            return 1;
 
        case BUFFALO_MILK:
            return 2;
 
        default:
            throw new IllegalArgumentException(attribute + " not supported.");
        }
    }
 
    @Override
    public MilkType convertToEntityAttribute(Integer dbData) {
    	System.out.println("milkType - convertToEntityAttribute called");
        if (dbData == null)
            return null;
 
        switch (dbData) {
        case 1:
            return MilkType.COW_MILK;
 
        case 2:
            return MilkType.BUFFALO_MILK;
 
        default:
            throw new IllegalArgumentException(dbData + " not supported.");
        }
    }

}
