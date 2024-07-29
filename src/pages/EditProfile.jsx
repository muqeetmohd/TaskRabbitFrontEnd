import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../components/UserContext";
import './EditProfile.css';  // Import the new CSS file

const EditProfile = () => {
    const { user, handleFetchMe } = useUserContext();
    const navigate = useNavigate();
    console.log(user);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { username, location, gender, bio } = data;
        const updateUser = { email: user?.email };
        try {
            if (username) {
                updateUser.username = username;
            }
            if (location) {
                updateUser.location = location;
            }
            if (gender) {
                updateUser.gender = gender;
            }

            if (bio) {
                updateUser.bio = bio;
            }

            const response = await axios.patch(
                `http://localhost:3000/api/v1/users`,
                updateUser,
                {
                    withCredentials: true,
                }
            );
            console.log(response);

            reset();
            handleFetchMe();
            Swal.fire({
                icon: "success",
                title: "Done",
                text: "Profile Updated",
            });
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.message,
            });
        }
    };

    return (
        <div className="">
            <div className="title-row">
                Update Profile
            </div>
            <div className="content-row">
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <div className="profile-form">
                        {/* Username */}
                        <div className="row">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Type Here"
                                defaultValue={user?.username}
                                {...register("username", {
                                    required: {
                                        value: true,
                                        message: "Username required",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Too short (min 3char)",
                                    },
                                })}
                            />
                            {errors?.username && (
                                <span className="error-message">
                                    {errors?.username?.message}
                                </span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="row">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Type Here"
                                defaultValue={user?.email}
                                readOnly
                            />
                            {errors?.email && (
                                <span className="error-message">
                                    {errors?.email?.message}
                                </span>
                            )}
                        </div>

                        {/* Bio */}
                        <div className="row">
                            <label htmlFor="bio">Your Bio</label>
                            <input
                                type="text"
                                id="bio"
                                name="bio"
                                placeholder="Bio"
                                defaultValue={user?.bio}
                                {...register("bio", {
                                    minLength: {
                                        value: 3,
                                        message: "Too short (min 3 char)",
                                    },
                                })}
                            />
                            {errors?.bio && (
                                <span className="error-message">
                                    {errors?.bio?.message}
                                </span>
                            )}
                        </div>

                        {/* Location */}
                        <div className="row">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Location"
                                defaultValue={user?.location}
                                {...register("location", {
                                    minLength: {
                                        value: 3,
                                        message: "Too short (min 3char)",
                                    },
                                })}
                            />
                            {errors?.location && (
                                <span className="error-message">
                                    {errors?.location?.message}
                                </span>
                            )}
                        </div>

                        {/* Gender */}
                        <div className="row">
                            <label htmlFor="gender">Gender</label>
                            <select
                                name="gender"
                                id="gender"
                                defaultValue={user?.gender}
                                {...register("gender", {
                                    validate: {
                                        valueType: (value) => {
                                            return (
                                                value !== "none" ||
                                                "Select One"
                                            );
                                        },
                                    },
                                })}
                            >
                                <option value="none">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                            {errors?.gender && (
                                <span className="error-message">
                                    {errors?.gender?.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="submit-container">
                        <input
                            type="submit"
                            value="Update"
                            className="btn"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
