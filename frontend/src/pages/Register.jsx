
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {

    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register(form);
            alert("Registration successful");
            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="container py-5">

            <div className="auth-form mx-auto">

                <h2 className="text-center mb-4">
                    Create Account
                </h2>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter Name"
                        required
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Enter Email"
                        required
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Enter Password"
                        minLength="6"
                        required
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    <button className="btn btn-dark w-100">
                        Register
                    </button>

                </form>

                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>

            </div>

        </div>
    );
}

export default Register;
