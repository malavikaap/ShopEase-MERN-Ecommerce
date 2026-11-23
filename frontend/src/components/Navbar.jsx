
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {

    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    ShopEase
                </Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarMenu"
                >
                    <div className="navbar-nav ms-auto align-items-lg-center">

                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>

                        <NavLink className="nav-link" to="/cart">
                            Cart ({cartCount})
                        </NavLink>

                        <NavLink className="nav-link" to="/orders">
                            My Orders
                        </NavLink>

                        {user ? (
                            <>
                                <span className="nav-link">
                                    Hello, {user.name}
                                </span>

                                <button
                                    className="btn btn-outline-light btn-sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>

                                <Link
                                    className="btn btn-primary btn-sm ms-lg-2"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
