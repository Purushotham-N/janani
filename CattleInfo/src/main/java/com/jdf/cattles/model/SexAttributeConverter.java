package com.jdf.cattles.model;


import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class SexAttributeConverter implements AttributeConverter<Sex, Integer> {
 
    @Override
    public Integer convertToDatabaseColumn(Sex attribute) {
    	System.out.println("Sex - convertToDatabaseColumn called: attrubute:"+ attribute);
    	
        if (attribute == null)
            return null;
        
        switch (attribute) {
        case MALE:
            return 1;
 
        case FEMALE:
            return 2;
 
        default:
            throw new IllegalArgumentException(attribute + " not supported.");
        }
    }
 
    @Override
    public Sex convertToEntityAttribute(Integer dbData) {
    	System.out.println("Sex - convertToEntityAttribute called: attrubute:"+ dbData);
        if (dbData == null)
            return null;
 
        switch (dbData) {
        case 1:
            return Sex.MALE;
 
        case 2:
            return Sex.FEMALE;
        
        default:
            throw new IllegalArgumentException(dbData + " not supported.");
        }
    }

}
