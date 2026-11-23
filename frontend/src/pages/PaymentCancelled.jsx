
import { Link } from "react-router-dom";

function PaymentCancelled() {

    return (
        <div className="container text-center py-5">

            <h1 className="text-danger">
                Payment Cancelled
            </h1>

            <p>
                Your payment was not completed.
                Your cart items are still saved.
            </p>

            <Link
                to="/cart"
                className="btn btn-dark"
            >
                Return to Cart
            </Link>

        </div>
    );
}

export default PaymentCancelled;
