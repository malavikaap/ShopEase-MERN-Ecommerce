
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Product = require("../models/Product");
const Order = require("../models/Order");

// CREATE CHECKOUT SESSION
exports.createCheckoutSession = async (req, res) => {
    try {
        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const orderItems = [];
        const line_items = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            const quantity = Number(item.quantity);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            if (
                !Number.isInteger(quantity) ||
                quantity < 1 ||
                quantity > 20 ||
                product.stock < quantity
            ) {
                return res.status(400).json({
                    message: "Invalid quantity or insufficient stock"
                });
            }

            orderItems.push({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity
            });

            line_items.push({
                quantity,
                price_data: {
                    currency: "inr",
                    unit_amount: Math.round(product.price * 100),
                    product_data: {
                        name: product.name
                    }
                }
            });
        }

        const totalAmount = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount,
            paymentStatus: "pending"
        });

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items,

            customer_email: req.user.email,

            metadata: {
                orderId: String(order._id)
            },

            success_url:
                `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
                `${process.env.CLIENT_URL}/payment-cancelled`
        });

        order.stripeSessionId = session.id;
        await order.save();

        res.json({
            url: session.url
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};

// VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(
            req.query.session_id
        );

        const order = await Order.findOne({
            _id: session.metadata.orderId,
            user: req.user._id,
            stripeSessionId: session.id
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (
            session.payment_status === "paid" &&
            order.paymentStatus !== "paid"
        ) {
            order.paymentStatus = "paid";
            await order.save();

            for (const item of order.items) {
                await Product.updateOne(
                    {
                        _id: item.product,
                        stock: { $gte: item.quantity }
                    },
                    {
                        $inc: { stock: -item.quantity }
                    }
                );
            }
        }

        res.json({
            paymentStatus: order.paymentStatus,
            orderId: order._id
        });

    } catch (error) {
        res.status(400).json({
            message: "Payment verification failed"
        });
    }
};
