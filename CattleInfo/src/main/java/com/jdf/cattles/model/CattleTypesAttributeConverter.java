package com.jdf.cattles.model;


import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class CattleTypesAttributeConverter implements AttributeConverter<CattleType, Integer> {
 
    @Override
    public Integer convertToDatabaseColumn(CattleType attribute) {
    	System.out.println("CattleType - convertToDatabaseColumn called: attrubute:"+ attribute);
    	
        if (attribute == null)
            return null;
        
        switch (attribute) {
        case COW:
            return 1;
 
        case BUFFALO:
            return 2;
 
        default:
            throw new IllegalArgumentException(attribute + " not supported.");
        }
    }
 
    @Override
    public CattleType convertToEntityAttribute(Integer dbData) {
    	System.out.println("CattleType - convertToEntityAttribute called: attrubute:"+ dbData);
        if (dbData == null)
            return null;
 
        switch (dbData) {
        case 1:
            return CattleType.COW;
 
        case 2:
            return CattleType.BUFFALO;
        
        default:
            throw new IllegalArgumentException(dbData + " not supported.");
        }
    }

}
