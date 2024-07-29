import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import DashboardLayout from "../Layout/DashBoardLayout";
import Login from "../pages/Login";
import CommonProtectRoute from "../shared/CommonProtectRoute";
import Landing from "../pages/Landing";
import Register from "../pages/Register";
import MainPage from "../pages/MainPage";
import EditProfile from "../pages/EditProfile";
import TodoList from "../components/todo/ToDoList";
// Placeholder components
// const Register = () => <div>Register dddddd</div>;
// const Login = () => <div>Login</div>;
const Error = () => <div>Errorr</div>;
// const EditProfile = () => <div>Edit Profile</div>;

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "taskmanager",
                element: <TodoList />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "dashboard",
                element: (
                    <CommonProtectRoute>
                        <DashboardLayout />
                    </CommonProtectRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <MainPage/>,
                    },
                    {
                        path: "edit-profile/:id",
                        element: <EditProfile />,
                    },
                ],
            },
        ],
    },
]);

export default router;
