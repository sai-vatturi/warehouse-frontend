from flask import Flask, jsonify, request
from flask_cors import CORS
import jwt
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config['SECRET_KEY'] = 'your_secret_key'  # Use a secure secret key

# Sample data
PRODUCTS = [
    {"id": 1, "name": "Laptop", "description": "High-performance laptop", "price": 1000, "quantity": 10, "category": "Electronics"},
    {"id": 2, "name": "Office Chair", "description": "Ergonomic chair", "price": 150, "quantity": 20, "category": "Furniture"},
    {"id": 3, "name": "Headphones", "description": "Noise-cancelling headphones", "price": 200, "quantity": 15, "category": "Electronics"},
]

ORDERS = []  # Empty orders to start

USERS = {
    "admin": {"password": "admin123", "role": "Admin"},
    "supplier": {"password": "supplier123", "role": "Supplier"},
    "customer": {"password": "customer123", "role": "Customer"}
}


# Generate a JWT Token
def generate_token(username, role):
    token = jwt.encode(
        {"username": username, "role": role, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        app.config['SECRET_KEY'],
        algorithm="HS256"
    )
    return token


# Login Endpoint
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if username in USERS and USERS[username]['password'] == password:
        token = generate_token(username, USERS[username]['role'])
        return jsonify({"token": token, "role": USERS[username]["role"]})

    return jsonify({"message": "Invalid credentials"}), 401


# Register Endpoint
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')

    if username in USERS:
        return jsonify({"message": "User already exists"}), 400

    # Save the new user
    USERS[username] = {
        "password": password,  # In production, hash passwords
        "role": role,
    }
    return jsonify({"message": "User registered successfully"}), 201


# Get Products
@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(PRODUCTS)


# Add Product (only for suppliers)
@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    product = {
        "id": len(PRODUCTS) + 1,
        "name": data["name"],
        "description": data["description"],
        "price": data["price"],
        "quantity": data["quantity"],
        "category": data["category"],
    }
    PRODUCTS.append(product)
    return jsonify({"message": "Product added successfully", "product": product}), 201


# Place an Order (only for customers)
@app.route('/api/orders', methods=['POST'])
def place_order():
    data = request.json
    order = {
        "id": len(ORDERS) + 1,
        "user": data["user"],  # Username placing the order
        "products": data["products"],  # List of product IDs and quantities
        "total": sum(item["price"] * item["quantity"] for item in data["products"]),
        "order_date": datetime.datetime.utcnow().isoformat(),
    }
    ORDERS.append(order)
    return jsonify({"message": "Order placed successfully", "order": order}), 201


# Get Orders (for customers and admins)
@app.route('/api/orders', methods=['GET'])
def get_orders():
    return jsonify(ORDERS)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
