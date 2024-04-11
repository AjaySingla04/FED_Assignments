document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products');
    const cartItems = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('totalAmount');
    let totalAmount = 0;
    const cartMap = new Map(); // To store cart items

    const products = [
        { id: 1, name: 'SHOES', image: 'shoes.jpg', price: 20 },
        { id: 2, name: 'JACKET', image: 'jacket.jpg', price: 35 },
        { id: 3, name: 'LAPTOP', image: 'download.jpg', price: 250 },
        { id: 4, name: 'MOBILE', image: 'mobile.jpg', price: 150 }
    ];

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.setAttribute('data-id', product.id);
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <span>${product.name}</span><br>
                <span class="price">$${product.price}</span>
            </div>
            <button class="add-to-cart">Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productDiv = button.parentElement;
            const productId = productDiv.getAttribute('data-id');
            const productName = productDiv.querySelector('.product-info span:first-child').textContent;
            const price = parseFloat(productDiv.querySelector('.price').textContent.replace('$', ''));

            if (cartMap.has(productId)) {
                // If the product is already in the cart, increment its quantity and update the UI
                const cartItem = cartMap.get(productId);
                cartItem.quantity++;
                cartItem.element.querySelector('.quantity').textContent = cartItem.quantity;
            } else {
                // If the product is not in the cart, add it to the cart and update the UI
                const cartItem = document.createElement('li');
                cartItem.innerHTML = `
                    <span>${productName} - $${price} <span class="quantity">1</span>x</span>
                    <button class="remove-from-cart" data-id="${productId}">Remove</button>
                `;
                cartItems.appendChild(cartItem);
                cartMap.set(productId, { name: productName, price: price, quantity: 1, element: cartItem });
            }

            // Update total amount
            totalAmount += price;
            totalAmountElement.textContent = totalAmount.toFixed(2);
        });
    });

    cartItems.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const productId = event.target.getAttribute('data-id');
            const cartItem = cartMap.get(productId);
            const price = cartItem.price;
            const quantity = cartItem.quantity;
            
            if (quantity > 1) {
                // If the product quantity is more than 1, decrement its quantity and update the UI
                cartItem.quantity--;
                cartItem.element.querySelector('.quantity').textContent = cartItem.quantity;
            } else {
                // If the product quantity is 1, remove it from the cart and update the UI
                cartItems.removeChild(cartItem.element);
                cartMap.delete(productId);
            }

            // Update total amount
            totalAmount -= price;
            totalAmountElement.textContent = totalAmount.toFixed(2);
        }
    });
});