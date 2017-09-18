var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "ohnolou87",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	// console.log("connected as id " + connection.threadId + "\n");
	showItems();
});

function showItems() {
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res) {
		for (var i = 0; i < res.length; i++) {
      		console.log("Id: " + res[i].item_id +
      			" | Item: " + res[i].product_name +
      			" | Price: " + res[i].price);
    	}
    	runSearch();
	});
}

function runSearch( ){
	inquirer.prompt([
	{
		type: "input",
		name: "item_id",
		message: "Which ID would you like to purchase?"
	},
	{	type: "input",
		name: "quanity",
		message: "How many would you like to buy?"
	}
	]).then(function(response){
		//query- collect all the details on the id the user selects
		var query1 = "SELECT * FROM products WHERE ?";
		connection.query(query1, {id: response.item_id}, function(err, res){

		//check for errors
			if (err) throw err;
		//make sure the shopper picks a valid ID
			if (response.item_id === 0 || response.item_id > 9){
				console.log("Please select from one of the availabel ID's listed");
				productList();
			} 
		//checking to see if you have enough of selected ID in stock
		//if we do then the following 'if' will happen and calculate the final bill	
			else{
				var productData = res[0];
				// console.log('productData = ' + JSON.stringify(productData));

					if (productData.stock_quanity >= response.quanity){
						console.log(" We have what you want instock. YAY!");
						//saving the new quanity to update the database
						var purchaseQuanity = productData.stock_quanity - response.quanity;
							//updating the database
							connection.query("UPDATE products SET ? WHERE ?",
							[
								//stock_quanity will go into the first ?
								{
									stock_quanity : purchaseQuanity
								},
								// id will go into the second ? 
								{
									id : response.item_id
								}

							], function(err, res){
							//calculating final bill 		
							var cost = productData.price * response.quanity;

								console.log("\n Order Fullfilled! Total amount due is $" + price + "\n");

								//ask if the customer wants to shop anymore before exiting the program
								buyMore();
							}
						);
					
					//if we do not have enough in stock, customer will be notified and can try again
					} else {
						console.log( "Sorry, we currently don't have enough of " + response.item_id + ". Please select another ID."),
						productList();
					};
			}

		});	
	});

}

	//ask user if they want to get anything else, if not, end the transaction
		function buyMore(){
			inquirer.prompt({
				name: "action",
				type: "list",
				message: "Would you like to make another purchase?\n",
				choices: ["yes", "no"]
			}).then(function(answer){
				switch(answer.action){
					case "yes":
						productList();
						break;
					case "no":
						connection.end();
						break;
					default:
						text = "error... please select yes or no";
					}
				});

			};

