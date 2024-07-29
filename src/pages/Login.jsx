import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useUserContext } from "../components/UserContext";
import './Login.css'; // Import the CSS file

const Login = () => {
    const { handleFetchMe } = useUserContext();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://altiusbackendtaskrabbit.vercel.app/api/v1/auth/login",
                data,
                {
                    withCredentials: true,
                }
            );
            Swal.fire({
                icon: "success",
                title: "Success",
                text: response?.data?.message,
            });
            handleFetchMe();
            reset();
            navigate("/dashboard");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.response?.data,
            });
        }
        setIsLoading(false);
    };

    return (
        <div className="login-container">
            <div className="header">
                <h1>Task Rabbit</h1>
            </div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Bunny@example.com"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "A valid email is required",
                            },
                        })}
                    />
                    {errors?.email && (
                        <span className="error-message">
                            {errors?.email?.message}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Type Here"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                        })}
                    />
                    {errors?.password && (
                        <span className="error-message">
                            {errors?.password?.message}
                        </span>
                    )}
                </div>
                <div className="button-group">
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </div>
            </form>
            <div className="footer">
                <p className="register-prompt">
                    Don't have an account.
                    <Link className="register-link" to="/register">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
