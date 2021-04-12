package com.jdf.orders.model;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ShiftsAttributeConverter implements AttributeConverter<Shifts, Integer> {
 
    @Override
    public Integer convertToDatabaseColumn(Shifts attribute) {
    	System.out.println("shifts - convertToDatabaseColumn called");
        if (attribute == null)
            return null;
        
        switch (attribute) {
        case MORNING:
            return 1;
 
        case EVENING:
            return 2;
        
        case TWICE_A_DAY:
        	return 3;
 
        default:
            throw new IllegalArgumentException(attribute + " not supported.");
        }
    }
 
    @Override
    public Shifts convertToEntityAttribute(Integer dbData) {
    	System.out.println("shifts - convertToEntityAttribute called");
        if (dbData == null)
            return null;
 
        switch (dbData) {
        case 1:
            return Shifts.MORNING;
 
        case 2:
            return Shifts.EVENING;
            
        case 3:
            return Shifts.TWICE_A_DAY;
 
        default:
            throw new IllegalArgumentException(dbData + " not supported.");
        }
    }

}
