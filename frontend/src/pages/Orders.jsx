
import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const { data } = await api.get("/orders/my-orders");
                setOrders(data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Unable to fetch orders"
                );
            }
        };

        fetchOrders();

    }, []);

    return (
        <div className="container py-5">

            <h2 className="mb-4">My Orders</h2>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {orders.length === 0 && !error && (
                <p>No orders found.</p>
            )}

            {orders.map(order => (

                <div
                    className="card p-3 mb-3"
                    key={order._id}
                >

                    <h5>
                        Order ID: {order._id}
                    </h5>

                    <p>
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <p>
                        Payment Status:{" "}
                        <strong>{order.paymentStatus}</strong>
                    </p>

                    <p>
                        Order Status: {order.orderStatus}
                    </p>

                    {order.items.map((item, index) => (
                        <p key={index}>
                            {item.name} × {item.quantity}
                            {" - "}₹{item.price * item.quantity}
                        </p>
                    ))}

                    <h5>
                        Total: ₹{order.totalAmount}
                    </h5>

                </div>

            ))}

        </div>
    );
}

export default Orders;
