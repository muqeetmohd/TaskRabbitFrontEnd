import React, { useState } from 'react'
import {useNavigate } from 'react-router';
const UploadImage = () => {

    const [image, setImage] = useState("");
    let navigate = useNavigate();

    const handleClickTaskManger = () => {
        navigate(`/taskmanager`);
    }
    function convertToBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error", error)
        }
    }

    const onInputChange = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0]);
    }
    return (
        <div>
            <form>
                <input type='file' accept="image/*" onChange={convertToBase64}></input>
                <button type="submit">Submit</button>
            </form>
            {image == "" || image == null ? "" : <img width={100} height={100} src={image} />}
            <div>
                <br></br>
            <button onClick={handleClickTaskManger}>Click here for Task Manager</button>
            </div>
        </div>
    )
}

export default UploadImage