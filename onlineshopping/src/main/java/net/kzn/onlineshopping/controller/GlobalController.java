package net.kzn.onlineshopping.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import net.kzn.onlineshopping.model.UserModel;
import net.kzn.shoppingbackend.dto.User;
import net.kzn.shoppingbackend.dao.UserDAO;

@ControllerAdvice
public class GlobalController {
	
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private HttpSession session;
	
	private UserModel userModel = null;
		
	
	
	@ModelAttribute("userModel")
	public UserModel getUserModel() {		
		if(session.getAttribute("userModel")==null) {
			// get the authentication object
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			
			
			
				// get the user from the database
				User user = userDAO.getByEmail(authentication.getName());
				
				if(user!=null) {
					// create a new model
					userModel = new UserModel();
					// set the name and the id
					userModel.setId(user.getId());
					userModel.setEmail(user.getEmail());
					userModel.setFullName(user.getFirstName() + " " + user.getLastName());
					userModel.setRole(user.getRole());
					
					if(user.getRole().equals("USER")) {
						// set the cart only if user is a buyer
						userModel.setCart(user.getCart());					
					}				
					// set the userModel in the session
					session.setAttribute("userModel", userModel);
					
					return userModel;
				}			
			}
		
		
		return (UserModel) session.getAttribute("userModel");		
	}
		
}