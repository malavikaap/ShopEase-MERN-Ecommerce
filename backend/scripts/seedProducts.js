
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

const products = [
    {
        name: "Sneakers",
        description: "Comfortable casual sneakers",
        category: "Fashion",
        price: 2499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop",
        stock: 20
    },
    {
        name: "Watch",
        description: "Modern stylish wrist watch",
        category: "Accessories",
        price: 3299,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
        stock: 15
    },
    {
        name: "Headphones",
        description: "Wireless headphones",
        category: "Electronics",
        price: 4999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
        stock: 10
    },
    {
        name: "Backpack",
        description: "Everyday travel backpack",
        category: "Accessories",
        price: 1899,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop",
        stock: 12
    },
    {
        name: "Sunglasses",
        description: "Classic sunglasses",
        category: "Fashion",
        price: 1499,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop",
        stock: 18
    },
    {
        name: "Smart Speaker",
        description: "Compact home speaker",
        category: "Electronics",
        price: 2799,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop",
        stock: 10
    }
];

const seedProducts = async () => {
    try {
        await connectDB();

        await Product.deleteMany({});
        await Product.insertMany(products);

        console.log("Products inserted successfully!");

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error("Error inserting products:", error);

        await mongoose.disconnect();
        process.exit(1);
    }
};

seedProducts();
