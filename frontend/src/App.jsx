
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";

import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {

    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    return children;
}

function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/payment-success"
                    element={
                        <ProtectedRoute>
                            <PaymentSuccess />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/payment-cancelled"
                    element={<PaymentCancelled />}
                />

                <Route
                    path="*"
                    element={<h2 className="text-center mt-5">404 Page Not Found</h2>}
                />

            </Routes>

            <footer className="bg-dark text-white text-center p-3 mt-5">
                © 2026 ShopEase. All Rights Reserved.
            </footer>

        </BrowserRouter>
    );
}

export default App;
