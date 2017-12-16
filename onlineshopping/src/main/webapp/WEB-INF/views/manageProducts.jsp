<%@taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<div class="container">
	<div class="row">
	
		<c:if test="${not empty message}">
	
			<div class="col-xs-12">
			
				<div class="alert alert-success alert-dismissible">
				
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					
					${message}
				
				</div>
			
			</div>
		
		</c:if>

		<div class="col-md-offset-2 col-md-8">

			<div class="panel panel-primary">

				<div class="panel-heading">

					<h4>Product Management</h4>

				</div>
				<div class="panel-body">
					<!-- Form Element -->
					<sf:form class="form-horizontal" modelAttribute="product"
						action="${contextRoot}/manage/products"
						method="POST" 
						enctype="multipart/form-data">
					
						<div class="form-group">
							<label class="control-label col-md-4" for="name">Enter Product name: </label>
							<div class="col-md-8">
								<sf:input type="text" path="name" id="name" placeholder="Product Name" class="form-control"/>
								<sf:errors path="name" cssClass="help-block" element="em"/>
							</div>
						</div>
						
						<div class="form-group">
							<label class="control-label col-md-4" for="brand">Enter Brand name: </label>
							<div class="col-md-8">
								<sf:input type="text" path="brand" id="brand" placeholder="Brand Name" class="form-control"/>
								<sf:errors path="brand" cssClass="help-block" element="em"/>
							</div>
						</div>
						
						<div class="form-group">
							<label class="control-label col-md-4">Description</label>
							<div class="col-md-8">
								<sf:textarea path="description" class="form-control"
									placeholder="Enter your description here!" />
								<sf:errors path="description" cssClass="help-block" element="em"/>
							</div>
						</div>
						
						<div class="form-group">
							<label class="control-label col-md-4" for="unitPrice">Enter Unit Price: </label>
							<div class="col-md-8">
								<sf:input type="number" path="unitPrice" id="unitPrice" placeholder="Unit price in &#8364" class="form-control"/>
								<sf:errors path="unitPrice" cssClass="help-block" element="em"/>
							</div>
						</div>
						
						<div class="form-group">
							<label class="control-label col-md-4" for="quantity">Quantity Available: </label>
							<div class="col-md-8">
								<sf:input type="number" path="quantity" id="quantity" placeholder="Quantity Available" class="form-control"/>
							</div>
						</div>
						
						<!-- File element for image upload -->
						<div class="form-group">
							<label class="control-label col-md-4">Select an Image: </label>
							<div class="col-md-8">
								<sf:input type="file" path="file" class="form-control"/>
								<sf:errors path="file" cssClass="help-block" element="em"/> 
							</div>
						</div>
						
						<div class="form-group">
							<label class="control-label col-md-4" for="categoryId">Select Category: </label>
							<div class="col-md-8">
								<sf:select class="form-control"  id="categoryId" path="categoryId" 
									items="${categories}"
									itemLabel="name"
									itemValue="id"
								/>
								<c:if test="${product.id == 0}">
								<div class="text-right">
									<br/>			
																							
									<button type="button" class="btn btn-warning btn-xs" data-toggle="modal" data-target="#myCategoryModal">Add New Category</button>
								</div>	
								</c:if>
							</div>
						</div>
						
						<div class="form-group">
							<div class="col-md-offset-4 col-md-8">
								<input type="submit" name="submit" id="submit" value="Submit" class="btn btn-primary"/>
							</div>
						</div>
						<!-- Hidden fields for products -->
						<sf:hidden path="id"/>
						<sf:hidden path="code"/>
						<sf:hidden path="supplierId"/>
						<sf:hidden path="active"/>
						<sf:hidden path="purchases"/>
						<sf:hidden path="views"/>
					
					</sf:form>
				
				</div>

			</div>

		</div>

	</div>

	<div class="row">

		<div class="col-xs-12">
			<h3>Available Products</h3>
			<hr/>
		</div>
		<div class="col-xs-12">
			<div style="overflow:auto">
				<!-- Product table for Admin -->
				<table id="adminProductsTable" class="table table-striped table-bordered">
				<thead>					
					<tr>					
						<th>Id</th>
						<th>&#160;</th>
						<th>brand</th>
						<th>Name</th>
						<th>Quantity</th>
						<th>Unit Price</th>
						<th>Active</th>				
						<th>Edit</th>
					</tr>					
				</thead>
				
				<tfoot>
					<tr>					
						<th>Id</th>
						<th>&#160;</th>
						<th>brand</th>
						<th>Name</th>
						<th>Quantity</th>
						<th>Unit Price</th>
						<th>Active</th>				
						<th>Edit</th>
					</tr>									
				</tfoot>

			</table>
			</div>

		</div>
		
		
	</div>

		<div class="modal fade" id="myCategoryModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">New Category</h4>
	      </div>
	      <div class="modal-body">
				<!-- Category Form -->
				<sf:form id="categoryForm" modelAttribute="category" class="form-horizontal"  action="${contextRoot}/manage/category" 
						method="POST">
	        	
       			<div class="form-group">
					<label for="category_name" class="control-label col-md-4">Category Name</label>
					<div class="col-md-8">
						<sf:input type="text" path="name" id="category_name" class="form-control"/> 
					</div>
				</div>
       			
       			<div class="form-group">				
					<label for="category_description" class="control-label col-md-4">Description</label>
					<div class="col-md-8">
						<sf:textarea cols="" rows="5" path="description" id="category_description" class="form-control"/> 
					</div>
				</div>	        	        
	        
	        
				<div class="form-group">				
					<div class="col-md-offset-4 col-md-8">					
						<input type="submit"  value="Save" class="btn btn-primary"/>						
					</div>
				</div>	        
	        </sf:form>
				</div>
			</div>
		</div>
	</div>
</div>