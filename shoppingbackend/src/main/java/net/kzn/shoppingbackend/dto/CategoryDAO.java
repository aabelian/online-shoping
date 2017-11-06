package net.kzn.shoppingbackend.dto;

import java.util.List;
import net.kzn.shoppingbackend.dto.Category;

public interface CategoryDAO {

	
	List<Category>  list();
	Category get(int id);
	
}
