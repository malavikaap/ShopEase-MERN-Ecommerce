
const Order = require("../models/Order");

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
