
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function PaymentSuccess() {

    const [params] = useSearchParams();

    const [message, setMessage] = useState(
        "Verifying payment..."
    );

    const [success, setSuccess] = useState(false);

    const { clearCart } = useCart();

    useEffect(() => {

        const verifyPayment = async () => {

            try {
                const sessionId = params.get("session_id");

                if (!sessionId) {
                    setMessage("Payment session not found");
                    return;
                }

                const { data } = await api.get(
                    "/payment/verify-session",
                    {
                        params: {
                            session_id: sessionId
                        }
                    }
                );

                if (data.paymentStatus === "paid") {

                    setMessage(
                        "Your payment was successful!"
                    );

                    setSuccess(true);
                    clearCart();

                } else {

                    setMessage(
                        "Payment is not confirmed yet. Check My Orders."
                    );
                }

            } catch (error) {
                setMessage(
                    "Unable to verify payment. Please check My Orders."
                );
            }
        };

        verifyPayment();

    }, [params]);

    return (
        <div className="container text-center py-5">

            <h1 className={success ? "text-success" : ""}>
                {success
                    ? "Payment Successful!"
                    : "Payment Status"}
            </h1>

            <p>{message}</p>

            <Link to="/orders" className="btn btn-dark">
                View My Orders
            </Link>

            <Link to="/" className="btn btn-outline-dark ms-2">
                Home
            </Link>

        </div>
    );
}

export default PaymentSuccess;
