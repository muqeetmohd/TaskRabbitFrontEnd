import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import './Register.css'; // Import the CSS file

const Register = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [isPasswordMatched, setIsPasswordMatched] = useState({
        status: true,
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { username, email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            setIsPasswordMatched({
                status: false,
                message: "Both passwords do not match.",
            });
            return;
        } else {
            setIsLoading(true);
            const user = { username, email, password };
            try {
                const response = await axios.post(
                    "https://altiusbackendtaskrabbit.vercel.app/api/v1/auth/register",
                    user
                );

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response?.data?.message,
                });
                reset();
                navigate("/login");
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error?.response?.data,
                });
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsPasswordMatched({ status: true, message: "" });
        }, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isPasswordMatched.status]);

    return (
        <div className="register-container">
            <div className="header">
                <h1>Task Rabbit</h1>
            </div>
            <h1>Create Account</h1>
            {!isPasswordMatched?.status && (
                <p className="password-mismatch">
                    Both passwords do not match.
                </p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Type Here"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "Username is required",
                            },
                            maxLength: {
                                value: 30,
                                message: "Username is too long (max 30 chars)",
                            },
                            minLength: {
                                value: 3,
                                message: "Username is too short (min 3 chars)",
                            },
                            pattern: {
                                value: /^[A-Za-z][A-Za-z0-9_]*$/,
                                message:
                                    "Username can't start with a number or special characters",
                            },
                        })}
                    />
                    {errors?.username && (
                        <span className="error-message">
                            {errors?.username?.message}
                        </span>
                    )}
                </div>
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
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                message: "Enter a valid email",
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
                            maxLength: {
                                value: 20,
                                message: "Password is too long (max 20 chars)",
                            },
                            minLength: {
                                value: 8,
                                message: "Password is too short (min 8 chars)",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
                                message:
                                    "At least one uppercase letter, one special character, and one number are required",
                            },
                        })}
                    />
                    {errors?.password && (
                        <span className="error-message">
                            {errors?.password?.message}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Type Here"
                        {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: "Confirm Password is required",
                            },
                        })}
                    />
                    {errors?.confirmPassword && (
                        <span className="error-message">
                            {errors?.confirmPassword?.message}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </div>
            </form>
            <div className="footer">
                <p className="login-prompt">
                    Already have an account.
                    <Link className="login-link" to="/login">
                        Login now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
