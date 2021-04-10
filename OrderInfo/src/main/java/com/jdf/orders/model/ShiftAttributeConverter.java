package com.jdf.orders.model;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ShiftAttributeConverter implements AttributeConverter<Shift, Integer> {
 
    @Override
    public Integer convertToDatabaseColumn(Shift attribute) {
    	System.out.println("shift - convertToDatabaseColumn called");
        if (attribute == null)
            return null;
        
        switch (attribute) {
        case MORNING:
            return 1;
 
        case EVENING:
            return 2;
 
        default:
            throw new IllegalArgumentException(attribute + " not supported.");
        }
    }
 
    @Override
    public Shift convertToEntityAttribute(Integer dbData) {
    	System.out.println("shift - convertToEntityAttribute called");
        if (dbData == null)
            return null;
 
        switch (dbData) {
        case 1:
            return Shift.MORNING;
 
        case 2:
            return Shift.EVENING;
 
        default:
            throw new IllegalArgumentException(dbData + " not supported.");
        }
    }

}
