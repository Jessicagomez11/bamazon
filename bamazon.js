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
    showItems()

})


function showItems() {

    connection.query('SELECT * FROM products', function (err, results) {

        if (err) throw err;
        console.log("Welcome to Bamazon! This is a list of our products...")
        console.table(results)

        inquirer
            .prompt([
                {
                name: 'action',
                type: 'input',
                message:"What is the ID of the item you wish to purchase?",
            },{
                name: 'action',
                type: 'input',
                message:"how many?",
            }
        ])

            .then(answers => {
               console.log(answers.action)
            });
        connection.end()
    })
}




