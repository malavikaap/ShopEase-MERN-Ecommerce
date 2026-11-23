
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Cart() {

    const {
        cart,
        updateQuantity,
        removeFromCart,
        total
    } = useCart();

    const { user } = useAuth();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCheckout = async () => {

        if (!user) {
            navigate("/login", {
                state: { from: "/cart" }
            });
            return;
        }

        try {
            setLoading(true);
            setError("");

            const { data } = await api.post(
                "/payment/create-checkout-session",
                {
                    items: cart.map(item => ({
                        productId: item._id,
                        quantity: item.quantity
                    }))
                }
            );

            window.location.href = data.url;

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Payment failed to start"
            );
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container text-center py-5">
                <h2>Your Cart is Empty</h2>

                <Link to="/" className="btn btn-dark mt-3">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <h2 className="mb-4">Shopping Cart</h2>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="row">

                <div className="col-md-8">

                    {cart.map(item => (

                        <div
                            className="cart-item d-flex align-items-center gap-3 mb-4"
                            key={item._id}
                        >

                            <img
                                src={item.image}
                                width="100"
                                height="100"
                                alt={item.name}
                            />

                            <div className="flex-grow-1">

                                <h5>{item.name}</h5>

                                <p>₹{item.price}</p>

                                <button
                                    className="btn btn-sm btn-outline-dark"
                                    onClick={() =>
                                        updateQuantity(
                                            item._id,
                                            item.quantity - 1
                                        )
                                    }
                                >
                                    -
                                </button>

                                <span className="mx-3">
                                    {item.quantity}
                                </span>

                                <button
                                    className="btn btn-sm btn-outline-dark"
                                    onClick={() =>
                                        updateQuantity(
                                            item._id,
                                            item.quantity + 1
                                        )
                                    }
                                >
                                    +
                                </button>

                                <button
                                    className="btn btn-link text-danger"
                                    onClick={() =>
                                        removeFromCart(item._id)
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                            <strong>
                                ₹{item.price * item.quantity}
                            </strong>

                        </div>

                    ))}

                </div>

                <div className="col-md-4">

                    <div className="border rounded p-4">

                        <h4>Order Summary</h4>

                        <hr />

                        <div className="d-flex justify-content-between">
                            <span>Total</span>
                            <strong>₹{total}</strong>
                        </div>

                        <button
                            className="btn btn-dark w-100 mt-4"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading
                                ? "Redirecting..."
                                : "Proceed to Payment"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Cart;
