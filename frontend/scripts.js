let cart = [];
let cartCountElement = document.getElementById('cart-count');
let totalAmountElement = document.getElementById('total-amount');
let cartItemsList = document.getElementById('cart-items');

// Function to add item to the cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
}

// Function to remove item from the cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Function to update cart display
function updateCart() {
    cartCountElement.textContent = cart.length;
    cartItemsList.innerHTML = '';  // Clear the list

    let totalAmount = 0;

    cart.forEach(item => {
        totalAmount += item.price * item.quantity;

        // Create list item with dropdown for quantity
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price}
            <select onchange="updateItemQuantity(${item.id}, this.value)">
                ${generateQuantityOptions(item.quantity)}
            </select>
            x $${item.price} = $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsList.appendChild(li);
    });

    totalAmountElement.textContent = totalAmount.toFixed(2);
}

// Function to generate the quantity options for the dropdown
function generateQuantityOptions(currentQuantity) {
    let options = '';
    for (let i = 1; i <= 10; i++) { // Limit the quantity selection to 10
        options += `<option value="${i}" ${i === currentQuantity ? 'selected' : ''}>${i}</option>`;
    }
    return options;
}

// Function to update the quantity of an item
function updateItemQuantity(id, newQuantity) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = parseInt(newQuantity);
    }
    updateCart();
}

// Function to toggle cart visibility
function toggleCart() {
    const cartSection = document.getElementById('cart');
    cartSection.style.display = (cartSection.style.display === 'none' || cartSection.style.display === '') ? 'block' : 'none';
}
