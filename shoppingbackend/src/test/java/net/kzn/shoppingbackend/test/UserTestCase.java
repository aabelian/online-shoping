package net.kzn.shoppingbackend.test;

import static org.junit.Assert.assertEquals;

import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import net.kzn.shoppingbackend.dao.UserDAO;
import net.kzn.shoppingbackend.dto.Address;
import net.kzn.shoppingbackend.dto.Cart;
import net.kzn.shoppingbackend.dto.User;

public class UserTestCase {

	private static AnnotationConfigApplicationContext context;
	private static UserDAO userDAO;
	private User user = null;
	private Cart cart = null;
	private Address address = null;
	
	
	@BeforeClass
	public static void init() {
		context = new AnnotationConfigApplicationContext();
		context.scan("net.kzn.shoppingbackend");
		context.refresh();
		
		userDAO = (UserDAO) context.getBean("userDAO");
	}
	

/*	@Test
	public void testAdd() {
		
		user = new User() ;
		user.setFirstName("Hrithik");
		user.setLastName("Roshan");
		user.setEmail("hr@gmail.com");
		user.setContactNumber("1234512345");
		user.setRole("USER");
		user.setPassword("123456");
		
		// add the user
		assertEquals("Failed to add the user!", true, userDAO.addUser(user));	

		// add the address
		
		address = new Address();
		address.setAddressLineOne("101/B Jadoo Society, Krissh Nagar");
		address.setAddressLineTwo("Near Kaabil Store");
		address.setCity("Mumbai");
		address.setState("Maharashtra");
		address.setCountry("India");
		address.setPostalCode("400001");
		address.setBilling(true);
		
		// linked the address with the user
		address.setUserId(user.getId());
		
		// add the address
		assertEquals("Failed to add the billing address!", true, userDAO.addAddress(address));
		
		if(user.getRole().equals("USER")){
			// create a cart for this user
			cart = new Cart();
			cart.setUser(user);
			
			// add the cart 
			assertEquals("Failed to add the cart!", true, userDAO.addCart(cart));
		}
		
		// add the shipping address for this user
		address = new Address();
		address.setAddressLineOne("201/B Jadoo Society, Kishan Kanhaiya Nagar");
		address.setAddressLineTwo("Near Kudrat Store");
		address.setCity("Mumbai");
		address.setState("Maharashtra");
		address.setCountry("India");
		address.setPostalCode("400001");
		// set shipping to true
		address.setShipping(true);
		
		// link it with the user
		address.setUserId(user.getId());
		
		// add the shipping address
		assertEquals("Failed to add the shipping address!", true, userDAO.addAddress(address));

	}
*/
	/*@Test
	public void testAdd() {
		
		user = new User() ;
		user.setFirstName("Hrithik");
		user.setLastName("Roshan");
		user.setEmail("hr@gmail.com");
		user.setContactNumber("1234512345");
		user.setRole("USER");
		user.setPassword("123456");
		
				
		if(user.getRole().equals("USER")){
			// create a cart for this user
			cart = new Cart();
			cart.setUser(user);
			
			// attach cart with the user
			user.setCart(cart);
		}
		// add the user
		assertEquals("Failed to add the user!", true, userDAO.addUser(user));	
*/
/*	@Test
	public void testUpdateCart() {
		user = userDAO.getByEmail("hr@gmail.com");
		cart = user.getCart();
		cart.setGrandTotal(5555);
		cart.setCartLines(2);
		assertEquals("Failed to update the cart!", true, userDAO.updateCart(cart));			

	}*/
	
/*	@Test
	public void testAddAddress() {
		user = new User() ;
		user.setFirstName("Hrithik");
		user.setLastName("Roshan");
		user.setEmail("hr@gmail.com");
		user.setContactNumber("1234512345");
		user.setRole("USER");
		user.setPassword("123456");
		
		// add the user
		assertEquals("Failed to add the user!", true, userDAO.addUser(user));	

		// add the address
		
		address = new Address();
		address.setAddressLineOne("101/B Jadoo Society, Krissh Nagar");
		address.setAddressLineTwo("Near Kaabil Store");
		address.setCity("Mumbai");
		address.setState("Maharashtra");
		address.setCountry("India");
		address.setPostalCode("400001");
		address.setBilling(true);
		
		address.setUser(user);
		
		// add the user
		assertEquals("Failed to add address!", true, userDAO.addAddress(address));	
		
		// add shipping addrress
		address = new Address();
		address.setAddressLineOne("201/B Jadoo Society, Kishan Kanhaiya Nagar");
		address.setAddressLineTwo("Near Kudrat Store");
		address.setCity("Mumbai");
		address.setState("Maharashtra");
		address.setCountry("India");
		address.setPostalCode("400001");
		// set shipping to true
		address.setShipping(true);
		
		address.setUser(user);
		
		// add the user
		assertEquals("Failed to add shipping address!", true, userDAO.addAddress(address));	
	
	}
*/
	
/*	@Test
	public void testAddAddress(){
		user = userDAO.getByEmail("hr@gmail.com");
		
		address = new Address();
		address.setAddressLineOne("301/B Jadoo Society, Kishan Kanhaiya Nagar");
		address.setAddressLineTwo("Near Kudrat Store");
		address.setCity("Bangalore");
		address.setState("Karanataka");
		address.setCountry("India");
		address.setPostalCode("400001");
		// set shipping to true
		address.setShipping(true);
		
		address.setUser(user);
		
		// add the user
		assertEquals("Failed to add shipping address!", true, userDAO.addAddress(address));	
	}*/
	
	@Test
	public void testGetAddresses(){
		user = userDAO.getByEmail("hr@gmail.com");
		assertEquals("Failed to fetch the list of addreess and the size does not match!", 2, 
				userDAO.listShippingAddresses(user).size());	
		
		assertEquals("Failed to fetch the billing addreess!","Mumbai", 
				userDAO.getBillingAddress(user).getCity());	

	}
	
}