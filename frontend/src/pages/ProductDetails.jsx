
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {
        api.get(`/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((error) => console.log(error));
    }, [id]);

    if (!product) {
        return <div className="container py-5">Loading...</div>;
    }

    return (
        <div className="container py-5">

            <div className="row align-items-center">

                <div className="col-md-6">
                    <img
                        src={product.image}
                        className="img-fluid rounded"
                        alt={product.name}
                    />
                </div>

                <div className="col-md-6">

                    <h2>{product.name}</h2>

                    <h3>₹{product.price}</h3>

                    <p>{product.description}</p>

                    <p>Category: {product.category}</p>

                    <p>Stock: {product.stock}</p>

                    <button
                        className="btn btn-dark"
                        disabled={product.stock < 1}
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;
