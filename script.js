const backendURL = "http://localhost:3000";

async function fetchProducts() {
    try {
        const response = await fetch(`${backendURL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
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
    console.log("Adding product to cart:", productId);
    const response = await fetch(`${backendURL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
    });
    console.log("Response:", response.status); // Check status code
    if (response.ok) {
        alert('Product added to cart!');
    } else {
        alert('Failed to add product to cart');
    }
}


cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
        ${item.name} - $${item.price} x ${item.quantity}
        <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartContainer.appendChild(li);
});


async function viewCart() {
    const response = await fetch(`${backendURL}/cart`);
    const cartItems = await response.json();
    console.log(cartItems);
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

//remove item from cart integration
async function removeFromCart(productId) {
    await fetch(`${backendURL}/cart/${productId}`, { method: 'DELETE' });
    alert('Product removed from cart!');
    viewCart(); // Refresh cart view
}


// Load products when the page loads
if (window.location.pathname.includes('products.html')) {
    fetchProducts();
}

if (window.location.pathname.includes('cart.html')) {
    viewCart();
}
