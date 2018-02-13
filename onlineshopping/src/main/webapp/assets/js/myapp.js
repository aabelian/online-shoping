$(function(){
	//solving the active menu problem
	switch(menu){
		
	case 'About Us':
		$('#about').addClass('active');
		break;
	case 'Contact Us':
		$('#contact').addClass('active');
		break;
	case 'All Products':
		$('#listProducts').addClass('active');
		break;	
	case 'Manage Products':
		$('#manageProducts').addClass('active');
		break;
	case 'User Cart':
		$('#userCart').addClass('active');
		break;
	default:
		if (menu == "Home") break;
		$('#listProducts').addClass('active');
		$('#a_'+menu).addClass('active');
		break;
	}
	
	// to tackle the csrf token
	var token = $('meta[name="_csrf"]').attr('content');
	var header = $('meta[name="_csrf_header"]').attr('content');
	
	if(token.length > 0 && header.length > 0) {
		// set the token header for the ajax request
		$(document).ajaxSend(function(e, xhr, options) {
			xhr.setRequestHeader(header, token);
		});
	}
	
	
	// code for jquery dataTable
	
	var $table = $('#productListTable');
	
	// execute the below code only where we have this table
	if($table.length) {
		
		//console.log('Inside the table!');
		
		var jsonUrl = '';
		if(window.categoryId == ''){
			
			jsonUrl = window.contextRoot + '/json/data/all/products';
		}
		else{
			
			jsonUrl = window.contextRoot + '/json/data/category/'+ window.categoryId +'/products';
		}
			
		$table.DataTable({
			
			lengthMenu:[[3,5,10,-1], ['3 Records', '5 Records', '10 Records', 'ALL']],
			pageLength: 5, 
			ajax: {
				
				url: jsonUrl, 
				dataSrc: ''
			},
			columns: [
						{
							data : 'code',
							bSortable : false,
							mRender : function(data, type, row) {
		
								return '<img src="' + window.contextRoot
										+ '/resources/images/' + data
										+ '.jpg" class="dataTableImg"/>';
		
							}
						},
						{
							data: 'name'
						},
						{
							data: 'brand'
						},
						{
							data: 'unitPrice',
							mRender: function(data, type, row){
								return '&#8364; ' + data
							}
						},
						{
							data: 'quantity',
							mRender: function(data, type, row){
								
								if(data <1) {
									return '<span style="color:red">Out of stock!></span>';
								}
								return data;
							}
						},
						{
							data : 'id',
							bSortable : false,
							mRender : function(data, type, row) {

								var str = '';
								str += '<a href="'
										+ window.contextRoot
										+ '/show/'
										+ data
										+ '/product" class="btn btn-primary"><span class="glyphicon glyphicon-eye-open"></span></a> &#160;';
								
								if(userRole == 'ADMIN'){
									str += '<a href="'
										+ window.contextRoot
										+ '/manage/'
										+ data
										+ '/product" class="btn btn-warning"><span class="glyphicon glyphicon-pencil"></span></a>';
								}else{	
										if(row.quantity < 1){
											str += '<a href="javascript:void(0)" class="btn btn-success disabled"><span class="glyphicon glyphicon-shopping-cart"></span></a>';
										}
										else {
											str += '<a href="'
													+ window.contextRoot
													+ '/cart/add/'
													+ data
													+ '/product" class="btn btn-success"><span class="glyphicon glyphicon-shopping-cart"></span></a>';
											}
								}
								return str;
							}	
						}
						
					]
		});
	}
	
	// dismissing the alert after 3 seconds
	var $alert = $('.alert');
	
	if($alert.length){
		setTimeout(function(){
			$alert.fadeOut('slow');
		}, 3000)
	}
	//--------------
	$('.switch input[type="checkbox"]').on('change', function(){
		
		var checkbox = $(this);
		var checked= checkbox.prop('checked');
		var dMsg = (this.checked)? 'You want to activate the product?':
								'You want to deactivate the product?';
		var value = checkbox.prop('value');
		
		bootbox.confirm({
			size: 'medium',
			title: 'Product Activation',
			message: dMsg,
			callback: function(confirmed){
				if(confirmed){
					console.log(value);
					bootbox.alert({
						size: 'medium',
						title: 'Information',
						message: 'You are going to perform operation on product!' + value
					});
				}
				else{
					checkbox.prop('checked', !checked);
				}
			}
				
		});
	
	});
	//-----------------------------------------
	// data table for admin
	//-----------------------------------------
	
	var $adminProductsTable = $('#adminProductsTable');
	
	// execute the below code only where we have this table
	if($adminProductsTable.length) {
		
		//console.log('Inside the table!');
		
		var jsonUrl = window.contextRoot + '/json/data/admin/all/products';

			
		$adminProductsTable.DataTable({
			
			lengthMenu:[[10, 30, 50,-1], ['10 Records', '30 Records', '50 Records', 'ALL']],
			pageLength: 30, 
			ajax: {
				
				url: jsonUrl, 
				dataSrc: ''
			},
			columns: [
						{
							data: 'id'
						},
						{
							data : 'code',
							bSortable : false,
							mRender : function(data, type, row) {
		
								return '<img src="' + window.contextRoot
										+ '/resources/images/' + data
										+ '.jpg" class="adminDataTableImg"/>';
		
							}
						},
						{
							data: 'name'
						},
						{
							data: 'brand'
						},
						{
							data: 'quantity',
							mRender: function(data, type, row){
								
								if(data <1) {
									return '<span style="color:red">Out of stock!></span>';
								}
								return data;
							}
						},
						{
							data: 'unitPrice',
							mRender: function(data, type, row){
								return '&#8364; ' + data
							}
						},
						{
							data : 'active',
							bSortable: false,
							mRender: function(data,type,row){
								
								var str = '';
								
								str += '<label class="switch">';
								if(data){
									str += '<input type="checkbox" checked="checked" value="'+row.id+'" />';
								}
								else{
									str += '<input type="checkbox" value="'+row.id+'" />';
								}
								
								str += '<div class="slider"></div></label>';
								
								return str;
								
							}
							
								
							
						},
						{
							data:'id',
							bSortable: false,
							mRender: function(data, type, row){
								
								var str = '';
								str += '<a href="'+window.contextRoot+'/manage/'+data+'/product" class="btn btn-warning">';
								str += '<span class="glyphicon glyphicon-pencul"> </span></a>';
								
								return str;
							}
							
						}
						
					],
					
					initComplete: function(){
						
						var api = this.api();
						api.	$('.switch input[type="checkbox"]').on('change', function(){
							
							var checkbox = $(this);
							var checked= checkbox.prop('checked');
							var dMsg = (this.checked)? 'You want to activate the product?':
													'You want to deactivate the product?';
							var value = checkbox.prop('value');
							
							bootbox.confirm({
								size: 'medium',
								title: 'Product Activation',
								message: dMsg,
								callback: function(confirmed){
									if(confirmed){
										console.log(value);
										
										var activationUrl = window.contextRoot + '/manage/product/' + value + '/activation';
										
										$.post(activationUrl, function(data){
											bootbox.alert({
												size: 'medium',
												title: 'Information',
												message: 'data'
											});
										});
									}
									else{
										checkbox.prop('checked', !checked);
									}
								}
									
							});
						
						});
					}
					
		});
	}
	//-----------------------------
	// validation code for category
	
	var $categoryForm = $('#categoryForm');
	if($categoryForm.length){
		$categoryForm.validate({
			rules : {
				name : {
					required: true,
					minlength:2
				},
				description: {
					required: true
				}
			},
			
			message : {
				name : {
					
					required: 'Please add the category name!',
					minlength: 'The category name should be 2 or more characters!'
				},
				
				description: {
					required: 'Please add description for this category!'
					
				}
			},
			errorElement: 'em',
			errorPlacement: function(error, element){
				//add the class of help-block
				error.addClass('help-block');
				// add the error element after the input element
				error.insertAfter(element);
			}
			
		});
		
	}
	//-----------------------------
	
	//----validation for login form
	
	
	var $loginForm = $('#loginForm');
	if($loginForm.length){
		$loginForm.validate({
			rules : {
				username : {
					required: true,
					email: true
				},
				password: {
					required: true
				}
			},
			
			message : {
				username : {
					
					required: 'Please enter the username!',
					email: 'Please enter email address!'
				},
				
				password: {
					required: 'Please enter valid password!'
					
				}
			},
			errorElement: 'em',
			errorPlacement: function(error, element){
				//add the class of help-block
				error.addClass('help-block');
				// add the error element after the input element
				error.insertAfter(element);
			}
			
		}
			
		);
		
	}
	//-----------------------------
	/*------*/
	/* handle refresh cart*/	
	$('button[name="refreshCart"]').click(function(){
		var cartLineId = $(this).attr('value');
		var countField = $('#count_' + cartLineId);
		var originalCount = countField.attr('value');
		// do the checking only the count has changed
		if(countField.val() !== originalCount) {	
			// check if the quantity is within the specified range
			if(countField.val() < 1 || countField.val() > 3) {
				// set the field back to the original field
				countField.val(originalCount);
				bootbox.alert({
					size: 'medium',
			    	title: 'Error',
			    	message: 'Product Count should be minimum 1 and maximum 3!'
				});
			}
			else {
				// use the window.location.href property to send the request to the server
				var updateUrl = window.contextRoot + '/cart/' + cartLineId + '/update?count=' + countField.val();
				window.location.href = updateUrl;
			}
		}
	});
	
	
	
	
	
	
	//----------------------------
	
// ------ END of data table for admin ------
});
