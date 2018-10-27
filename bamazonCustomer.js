//  Bamazon Customer program

// import Table from 'cli-table';
// var Table = require('../lib');
var Table = require('cli-table');

var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

let ProductTable = [];
let arrID = [];
let arrQuantity = [];
let arrProductName = [];
let arrPrice = [];
let productQuantity;
let productName;
let price;
let objItem;
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    customerOrder()

});

var customerOrder = function () {

    let myQuery = "SELECT * FROM products";
    connection.query(myQuery, function (err, items) {
        if (err) throw err;
        // console.log(res);
        items.forEach(product => {
            arrID.push(product.item_id);
            arrQuantity.push(product.stock_quantity);
            arrProductName.push(product.product_name);
            arrPrice.push(product.price);
            
        });


        printTable(items);
        //   customerOrder();


        console.log("calling customer Inquirer")
        inquirer.prompt([{
                type: 'input',
                name: 'item_identity',
                message: "Select a product ID to purchase an item:",
                validate: function (item_identity) {
                    if (arrID.indexOf(parseInt(item_identity)) < 0) {
                        return "Please enter a valid ID";
                    } else {
                        let i = arrID.indexOf(parseInt(item_identity));
                        // console.log("\ni: ", i + " " + arrQuantity[i]);
                        productQuantity = arrQuantity[i];
                        productName = arrProductName[i];
                        price = arrPrice[i];
                        objItem = { 'productName': arrProductName[i], 'quantity': arrQuantity[i], 'price': arrPrice[i] };
                        console.log("price: ", price);
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'quantity',
                message: "How many units would you like to purchase?",
                validate: function (quantity) {
                    // console.log("productQuantity: ", productQuantity);
                    if (objItem.quantity < parseInt(quantity)) {
                        return "Insufficient Stock";
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function (custInput) {
            console.log("Inquirer User Input: ", custInput);
            let remainingQuantity = productQuantity - parseInt(custInput.quantity)
            console.log("remaining Quantity: ", remainingQuantity);

            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [{
                        stock_quantity: remainingQuantity
                    },
                    {
                        item_id: custInput.item_identity
                    }
                ],
                function (err, res) {
                    console.log(res.affectedRows + " products updated!\n");
                    PrintTableVert(objItem.productName, custInput.quantity, objItem.price);
                    inquirer.prompt([{
                        type: 'input',
                        name: 'isBackToCustOrder',
                        message: "Do you want to return to the order menu? (Y/N)"
                    }]).then(function (userInput) {
                        if (userInput.isBackToCustOrder.toUpperCase() === 'Y') {
                            customerOrder();
                        } else {
                            closeConnection();
                        }
                    })
                }
            );
        });
    });

}

function printTable(arrTable) {
    // instantiate
    const table = new Table({
        head: ['Item Id', 'Product Name', 'Price'],
        colWidths: [10, 50, 10]
    });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    arrTable.forEach(product => {
        table.push([product.item_id, product.product_name, product.price]);
    });

    console.log(table.toString());

}

function PrintTableVert(productName, quantity, totalCost) {
    // vertical tables
    console.log("printTablleVert - entry");
    console.log("parms: ", productName + " " + quantity + " " + totalCost);
    var table2 = new Table();

    table2.push({
        'Product': productName
    }, {
        'Quantity': quantity
    }, {
        'total cost': totalCost
    });

    console.log(table2.toString());
}

function closeConnection() {
    setTimeout(function () {
        connection.end();
        console.log("=====> connection closed");
    }, 2000);
}