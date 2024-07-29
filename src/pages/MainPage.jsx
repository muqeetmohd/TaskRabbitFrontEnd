import React from 'react';
// import UploadImage from './UploadImage';
import './MainPage.css';
import UploadImage from './UploadImage';
import { useDashboardContext } from '../Layout/DashBoardLayout';
import { useUserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {


    const { handleLogout } = useDashboardContext();
    const { user } = useUserContext();
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/dashboard/edit-profile/${user?._id}`);
    };

    const handleClickTaskManger = () => {
        navigate(`/taskmanager`);
    }

    return (
        <div className="main-page">
            <div className="top-bar">
                <button className="top-bar-button" onClick={handleLogout}>Logout</button>
                <button onClick={handleClick}>
                    Edit Profile
                </button>
                <button onClick={handleClickTaskManger} className="top-bar-button">Task Manager</button>
            </div>
            <div className="content">
                <UploadImage />
            </div>
        </div>
    );
};

export default MainPage;
