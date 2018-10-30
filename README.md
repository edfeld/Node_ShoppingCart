# bamazonCustomer

This is an mock online retail store application written in node.js with MySQL.  It runs as a console app.

1. This store has a MySQL Database called `bamazon`.

2. Insider the database is a table called `products`.

3. The products table contains the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. The database contains 10 items (i.e. "mock" data rows into this database and table).

5. Running this node console application will first display all of the items available for sale, including the ids, names, and prices of products for sale.

6. The app prompts users with two messages.

   * It asks them the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

7. Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

   * If not, the app logs the phrase like `Insufficient quantity!`, and prevents the order from going through.

8. If the store _does_ have enough of the product, the app will fulfill the customer's order.
   * The app updates the SQL database to reflect the remaining quantity.
   * Once the update has processed, the customer is shown the total cost of their purchase.

9. The user is allowed to reenter the purchase process or exit the application.

10. Here is the link to my video demonstration:  https://drive.google.com/file/d/1Rk4rCwSq4HEOBeHs8fSkMIS1yzXNALmQ/view

11. Here is a screen shot showing that the inventory on Polo shirts had been reduced from 3 to 1 during the video Demo:
    Product_table_db_screenshot.png