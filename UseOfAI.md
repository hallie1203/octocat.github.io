## Use of AI Acknowledgement

**Student ID**: 1155174837

**Project Phase**: 1A

**Date**: 2 Jan, 2025

## Acknowledgement


I acknowledge the use of Chatgpt to generate code towards the completion of the project.


**(Note that the code in this example does not achieve what we expect.)**
## Transcript

**Prompt**: there is a shopping cart icon, when hover, it show the shopping list

### Response
Implementing a Shopping Cart Icon That Shows the Shopping List on Hover
To create a shopping cart icon that reveals a shopping list when hovered, follow these steps using HTML, CSS, and JavaScript.

### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Shop</title>
    <link rel="stylesheet" href="css/styles.css">
    <script defer src="js/cart.js"></script>
</head>
<body>
    <header>
        <h1>Online Shop</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li class="cart-container">
                    <a href="cart.html">
                        <img src="images/cart-icon.png" alt="Cart" class="cart-icon">
                        <span id="cart-count">0</span>
                    </a>
                    <div class="cart-dropdown">
                        <h3>Your Shopping Cart</h3>
                        <table id="cart-items">
                            <tr><td>Cart is empty</td></tr>
                        </table>
                        <button id="checkout">Checkout</button>
                    </div>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="product-list">
            <div class="product">
                <img src="images/product1.jpg" alt="Product 1">
                <h2>Product 1</h2>
                <p>$10.00</p>
                <button class="add-to-cart" data-id="1" data-name="Product 1" data-price="10">Add to Cart</button>
            </div>

            <div class="product">
                <img src="images/product2.jpg" alt="Product 2">
                <h2>Product 2</h2>
                <p>$20.00</p>
                <button class="add-to-cart" data-id="2" data-name="Product 2" data-price="20">Add to Cart</button>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Online Shop</p>
    </footer>
</body>
</html>


### CSS (styles.css)
```css
/* Reset styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

/* Header and Navigation */
header, footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 15px;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
}

nav ul li {
    position: relative;
    margin: 0 15px;
}

/* Shopping Cart Icon */
.cart-container {
    position: relative;
}

.cart-icon {
    width: 30px;
    height: auto;
}

/* Cart Dropdown (Hidden by Default) */
.cart-dropdown {
    position: absolute;
    top: 40px;
    right: 0;
    width: 250px;
    background: white;
    border: 1px solid #ddd;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
    display: none;  /* Initially hidden */
    z-index: 100;
}

/* Show the cart dropdown when hovering over the cart */
.cart-container:hover .cart-dropdown {
    display: block;
}

/* Cart Table */
.cart-dropdown table {
    width: 100%;
    border-collapse: collapse;
}

.cart-dropdown th, .cart-dropdown td {
    border-bottom: 1px solid #ddd;
    padding: 5px;
    text-align: left;
}

/* Quantity Input */
.cart-dropdown input {
    width: 40px;
    padding: 5px;
    text-align: center;
}

/* Checkout Button */
.cart-dropdown button {
    width: 100%;
    background: #28a745;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
}

.cart-dropdown button:hover {
    background: #218838;
}

/* Product List */
.product-list {
    display: flex;
    gap: 20px;
    padding: 20px;
}

.product {
    border: 1px solid #ddd;
    padding: 15px;
    width: 200px;
    text-align: center;
}

.product img {
    width: 100%;
    height: auto;
}
Js Code:
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    displayCartItems();

    // Add to Cart functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productId = this.dataset.id;
            let productName = this.dataset.name;
            let productPrice = parseFloat(this.dataset.price);

            addToCart(productId, productName, productPrice);
            updateCartCount();
            displayCartItems();
        });
    });

    // Checkout button functionality
    document.getElementById("checkout")?.addEventListener("click", function () {
        alert("Proceeding to checkout...");
    });
});

// Function to add item to cart
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(product => product.id === id);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to update cart count in the header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
}

// Function to display cart items in the hover menu
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";
        
        cart.forEach(item => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></td>
                <td><button class="remove-item" data-id="${item.id}">X</button></td>
            `;

            cartItemsContainer.appendChild(row);
        });

        // Event listeners for removing items
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                removeItem(this.dataset.id);
            });
        });
    }
}

// Function to remove item from cart
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(product => product.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}


This code creates a simple shopping cart layout using Flexbox. You can add more items by duplicating the `.cart-item` div and updating the details accordingly. Let me know if you need any further customization or help!
