
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                setLoading(true);

                const { data } = await api.get("/products", {
                    params: { search, category }
                });

                setProducts(data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

    }, [search, category]);

    return (
        <>
            <div className="hero-section text-center">
                <h1>Welcome to ShopEase</h1>
                <p>Find your favourite products here</p>
                <a href="#products" className="btn btn-light">
                    Shop Now
                </a>
            </div>

            <div className="container py-5" id="products">

                <h2 className="text-center mb-4">
                    Our Products
                </h2>

                <div className="row mb-4">

                    <div className="col-md-6 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6">
                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Home">Home</option>
                        </select>
                    </div>

                </div>

                {loading ? (
                    <p className="text-center">Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="text-center">No products found</p>
                ) : (
                    <div className="row g-4">

                        {products.map((product) => (
                            <div
                                className="col-md-4 col-lg-3"
                                key={product._id}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}

                    </div>
                )}

            </div>
        </>
    );
}

export default Home;
