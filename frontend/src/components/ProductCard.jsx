
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {

    const { addToCart } = useCart();

    return (
        <div className="card h-100 shadow-sm">

            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image}
                    className="card-img-top product-image"
                    alt={product.name}
                />
            </Link>

            <div className="card-body">

                <h5>{product.name}</h5>

                <p className="text-muted">
                    {product.category}
                </p>

                <h5>₹{product.price}</h5>

                <button
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>

            </div>
        </div>
    );
}

export default ProductCard;
