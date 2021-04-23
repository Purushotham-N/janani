package com.jdf.fodder.inventory.model;


import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class FodderTypeAttributeConverter implements AttributeConverter<FodderType, Integer> {
 
    @Override
    public Integer convertToDatabaseColumn(FodderType attribute) {
    	System.out.println("FodderType - convertToDatabaseColumn called: attrubute:"+ attribute);
    	
        if (attribute == null)
            return null;
        
        switch (attribute) {
        case DRY_FODDER:
            return 1;
 
        case GREEN_FODDER:
            return 2;
            
        case SUPPLIMENTS:
            return 3;
            
        case MINERAL_MIXTURE:
            return 4;
            
        case CALCIUM_SYRUP:
            return 5;
 
        default:
            throw new IllegalArgumentException(attribute + " not supported.");
        }
    }
 
    @Override
    public FodderType convertToEntityAttribute(Integer dbData) {
    	System.out.println("CattleType - convertToEntityAttribute called: attrubute:"+ dbData);
        if (dbData == null)
            return null;
 
        switch (dbData) {
        case 1:
            return FodderType.DRY_FODDER;
 
        case 2:
            return FodderType.GREEN_FODDER;
            
        case 3:
            return FodderType.SUPPLIMENTS;
 
        case 4:
            return FodderType.MINERAL_MIXTURE;
            
        case 5:
            return FodderType.CALCIUM_SYRUP;
        
        default:
            throw new IllegalArgumentException(dbData + " not supported.");
        }
    }

}
