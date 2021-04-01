
package com.jdf.customers.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "customer")
public class Customer{
	Customer(){
//		empty constuctor
	}
		@Id
		@Column(name = "customer_id")
		@GeneratedValue(strategy = GenerationType.IDENTITY)
	    private long customerId;
		
		@Column(name = "first_name")
	    private String firstName;
		
		@Column(name = "last_name")
	    private String lastName;
		
		@Column(name = "mobile_no")
	    private String mobileNo;
		
		@Column(name = "whatsapp_no")
	    private String whatsappNo;
		
		@Column(name = "address")
	    private String address;

    /**
     * @return long return the customerId
     */
    public long getCustomerId() {
        return customerId;
    }

    /**
     * @param customerId the customerId to set
     */
    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    /**
     * @return String return the firstName
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * @param firstName the firstName to set
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * @return String return the lastName
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * @param lastName the lastName to set
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * @return String return the mobileNo
     */
    public String getMobileNo() {
        return mobileNo;
    }

    /**
     * @param mobileNo the mobileNo to set
     */
    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    /**
     * @return String return the whatsappNo
     */
    public String getWhatsappNo() {
        return whatsappNo;
    }

    /**
     * @param whatsappNo the whatsappNo to set
     */
    public void setWhatsappNo(String whatsappNo) {
        this.whatsappNo = whatsappNo;
    }

    /**
     * @return String return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address the address to set
     */
    public void setAddress(String address) {
        this.address = address;
    }

}