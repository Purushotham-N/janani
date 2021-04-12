package com.jdf.orders.model;


import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class ProductsTypesAttributeConverter implements AttributeConverter<Products, Integer> {
 
    @Override
    public Integer convertToDatabaseColumn(Products attribute) {
    	System.out.println("products - convertToDatabaseColumn called");
    	
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
    public Products convertToEntityAttribute(Integer dbData) {
    	System.out.println("products - convertToEntityAttribute called");
        if (dbData == null)
            return null;
 
        switch (dbData) {
        case 1:
            return Products.COW_MILK;
 
        case 2:
            return Products.BUFFALO_MILK;
        
        default:
            throw new IllegalArgumentException(dbData + " not supported.");
        }
    }

}
