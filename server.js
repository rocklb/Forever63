const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// In-memory product and cart storage
let products = [
    { id: 1, name: "Stylish Jacket", price: 50 },
    { id: 2, name: "Elegant Dress", price: 70 },
];

let cart = [];

// Routes
app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/cart', (req, res) => {
    res.json(cart);
});

app.get('/cart', (req, res) => {
    console.log("GET /cart request received");
    res.json(cart);
});


app.get('/cart', (req, res) => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.json({ cart, totalPrice });
});

app.post('/cart', (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        console.log("Cart after addition:", cart); // Log the cart
        res.json({ message: "Product added to cart", cart });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});


app.delete('/cart', (req, res) => {
    cart = [];
    res.json({ message: "Cart cleared", cart });
});

//remove an item from cart
app.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    cart = cart.filter(item => item.id !== parseInt(id));
    res.json({ message: "Item removed from cart", cart });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
});
