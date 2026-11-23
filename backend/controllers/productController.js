
const Product = require("../models/Product");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;

        let filter = {};

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        if (category && category !== "All") {
            filter.category = category;
        }

        const products = await Product.find(filter);

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {
        res.status(400).json({ message: "Invalid product ID" });
    }
};
