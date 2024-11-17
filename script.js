const backendURL = "http://localhost:3000";

async function fetchProducts() {
    const response = await fetch(`${backendURL}/products`);
    const products = await response.json();
    displayProducts(products);
}

function displayProducts(products) {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}

async function addToCart(productId) {
    await fetch(`${backendURL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
    });
    alert('Product added to cart!');
}

async function viewCart() {
    const response = await fetch(`${backendURL}/cart`);
    const cartItems = await response.json();
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    let total = 0;
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartContainer.appendChild(li);
        total += item.price;
    });
    document.getElementById('total-price').textContent = `Total: $${total}`;
}

// Load products when the page loads
if (window.location.pathname.includes('products.html')) {
    fetchProducts();
}

if (window.location.pathname.includes('cart.html')) {
    viewCart();
}
