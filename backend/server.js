
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(express.json());

// Test API
app.get("/", (req, res) => {
    res.send("E-Commerce Backend Running");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/products", require("./routes/productRoutes"));

app.use("/api/orders", require("./routes/orderRoutes"));

app.use("/api/payment", require("./routes/paymentRoutes"));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
