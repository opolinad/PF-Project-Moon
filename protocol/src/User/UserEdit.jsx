import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import app from '../Firebase/Firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { updateUsers } from "../ReduxToolkit/apiCalls/updateUserCall";
import { useNavigate } from 'react-router-dom';

import styles from "./UserEdit.module.css";

export default function UserEdit() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [error, setError] = useState({});
    const user = useSelector(state => state.user.currentUser)
    // const [password, setPassword] = useState("")
    const [profile, setProfile] = useState(null)
    const [active, setActive] = useState(false)
    // const [background, setBackground] = useState(null)

    const [inputs, setInputs] = useState({
        username: "",
        fullName: "",
        profilePhoto: ""
    });

    function handleInputChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const handleFile = (e) => {
        setProfile(e.target.files[0])
        setActive(true)
    }

    //NO TOCAR!!! PLISSS
    const upImage = (e) => {
        e.preventDefault()
        //Para que las imagen con el mismo nombre no se pisen
        const fileName = new Date().getTime() + profile.name
        //Traer del storage los datos
        const storage = getStorage(app)
        //Referencia
        const sotorageRef = ref(storage, fileName)
        //COnfiguracion de Firebase para los File y conseguir la URL
        const uploadTask = uploadBytesResumable(sotorageRef, profile);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs({
                        ...inputs,
                        profilePhoto: downloadURL
                    })
                    setActive(false)
                    // const updateUser = { ...inputs, profilePhoto: downloadURL };
                    // console.log(updateUser);
                    // addProduct(product, dispatch).then(response => {
                    //     history.push('/products')
                    // })
                });
            }
        );

    }


    function handleSubmit(e) {
        e.preventDefault();
        updateUsers(dispatch, user._id, inputs, user.accessToken)
            .then(res => {
                navigate('/home')
            })
        setInputs({
            username: "",
            fullName: "",
            profilePhoto: ""
        });
    }
    return (
        <div id={styles.editCont}>
            <form id={styles.editForm} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.editShell}>
                    <label className={styles.editLabel} >Username: </label>
                    <input
                        className={styles.editInput}
                        name="username"
                        type="text"
                        placeholder="username"
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.editShell}>
                    <label className={styles.editLabel}>FullName: </label>
                    <input
                        className={styles.editInput}
                        name="fullName"
                        type="text"
                        placeholder="fullName"
                        onChange={handleInputChange}
                    />
                </div>
                {/* <div>
                    <label>Password: </label>
                    <input
                        name="password"
                        type="text"
                        value={inputs.password}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div> */}
                <div className={styles.editShell}>
                    <label className={styles.editLabel}>Profile Photo: </label>
                    <input
                        className={styles.editInput}
                        type="file"
                        id="file1"
                        onChange={handleFile}
                    />
                </div>
                {/* <div>
                    <label>BackgroundPhoto: </label>
                    <input
                        type="file"
                        id="file2"
                        onChange={(e) => setBackground(e.target.files[0])}
                    />
                </div> */}
                {
                    !active ? (
                        <button id={styles.editSubmit} type="submit" >SUBMIT</button>
                    ) : (
                        <><p id={styles.editSubiendo}>Imagen subiendo</p></>
                    )
                }
            </form>
            <div id={styles.editUploadCont}><button id={styles.editUpload} onClick={(e) => upImage(e)}>UPLOAD IMAGE</button></div>
        </div>
    );
}
