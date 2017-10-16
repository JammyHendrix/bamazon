var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon'
});

connection.connect(function(err){
	if (err) throw err;
	console.log('connected as id ' + connection.threadId);
	queryAllProducts();
	buyProduct();
});

function queryAllProducts() {
	connection.query('SELECT * FROM products', function(err,res){
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].item_id + '  |  ' + res[i].product_name + '  |  ' + res[i].department_name + '  |  ' + res[i].price + '  |  ' + res[i].stock_quantity);
		}
		console.log('-----------------------------------------------');

		
				});
		
}
function buyProduct() {
	connection.query('SELECT item_id FROM products', function(err,res){
		if (err) throw err;

				inquirer.prompt([
			{
				name: 'choice',
				type: 'input',
				choices: function(){
					var choiceArray = [];
					for (var i = 0; i < res.length; i++) {
						//choiceArray.push(res[i].item_id);
					
					}

					return choiceArray;
				},
				
				message: 'What is the ID of the product you would like to buy?'
				
			},
			{
				name: 'quantity',
				type: 'input',
				message: 'How many would you like to buy?'
			}
			])
		.then(function(answer) {
			var chosenItem;
			for (var i = 0; i < res.length; i++) {
				if (res[i].item_id === answer.choice) {
					chosenItem = res[i];
			}

		}
	});
	});

}

