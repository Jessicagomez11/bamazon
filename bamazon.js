var inquirer = require('inquirer');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazondb'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId)
    welcome()

})


function welcome() {

    connection.query('SELECT * FROM products', function (err, results) {

        if (err) throw err;
        console.log("Welcome to Bamazon! ")
        console.table(results)
        makeTransaction()


    })
}

function displayProducts() {
    connection.query('SELECT * FROM products', function (err, results) {
        if (err) throw err;
        console.table(results)
    })
}



function makeTransaction() {
    inquirer
        .prompt([
            {
                name: 'action',
                type: 'input',
                message: "What is the ID of the item you wish to purchase?",
            }, {
                name: 'quantity',
                type: 'input',
                message: "how many?",
            }
        ])

        .then(answers => {

           connection.query('SELECT stock_quantity FROM products WHERE item_id = ?', [answers.action], function(err, results){
                if (err) throw err;

                var quantityInStock = JSON.stringify(results[0].stock_quantity)
                
                console.log("There are "+quantityInStock + " in stock!")
                console.log("You want to purchase " + answers.quantity+".")

                var stockQuantity = parseInt(quantityInStock);
                var userQuantity = parseInt(answers.quantity);

                if ( stockQuantity > userQuantity) {
    
                    connection.query('UPDATE products SET stock_quantity = stock_quantity -' + answers.quantity + ' WHERE item_id = ' + answers.action + ';', function (err, results) {
    
                        if (err) console.log(err);
                        displayProducts()
                        console.log('Transaction complete!')

                        connection.query('SELECT price FROM products WHERE item_id = ?', [answers.action], function ( err, priceRes){
                            if (err) throw err;
                            var totalCost= JSON.stringify(priceRes[0].price) * answers.quantity
                            console.log("Your total is $"+ totalCost )
                        })
            
                        connection.end()
                    })
                } else {
                    console.log("Insufficient quantity! ")
                    makeTransaction()
                }
            })


        });

}


