
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(form);

            navigate(location.state?.from || "/");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="container py-5">

            <div className="auth-form mx-auto">

                <h2 className="text-center mb-4">
                    Login
                </h2>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        required
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        required
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    <button className="btn btn-dark w-100">
                        Login
                    </button>

                </form>

                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>

            </div>

        </div>
    );
}

export default Login;
