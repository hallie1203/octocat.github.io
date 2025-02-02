document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    displayCartItems();

    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("add")) {
            let productId = parseInt(event.target.dataset.id); // Ensure it's a number
            let productName = event.target.dataset.name;
            let productPrice = parseFloat(event.target.dataset.price);

            addToCart(productId, productName, productPrice);
            updateCartCount();
            displayCartItems();
        }
    });

    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            let productId = parseInt(event.target.dataset.id);
            removeItem(productId);
        }
    });

    document.body.addEventListener("input", function (event) {
        if (event.target.classList.contains("quantity-input")) {
            let productId = parseInt(event.target.dataset.id);
            let newQuantity = parseInt(event.target.value);

            if (newQuantity > 0) {
                updateCartQuantity(productId, newQuantity);
            } else {
                removeItem(productId);
            }
        }
    });
});

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

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalItems;
}

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ""; // Clear previous content

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<tr><td>Cart is empty</td></tr>";
            return;
        }

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
    }
}

function updateCartQuantity(id, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(product => product.id === id);

    if (item) {
        item.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(product => product.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}
