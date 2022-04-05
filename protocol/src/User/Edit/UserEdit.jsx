import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers } from "../../ReduxToolkit/apiCalls/updateUserCall";
import { useNavigate } from "react-router-dom";
import DefaultProfile from "../../assets/default_profile_photo.svg";
import axios from "axios";
import { useImage } from "../../hooks/useImage";

import styles from "./UserEdit.module.css";

import { Toast } from "../../helpers/alerts/alert";

function validar(input) {
  let errors = {}
  if (!input.oldPassword) {
    errors.oldPassword = "This field can't be empty"
  }
  if (!input.newPassword) {
    errors.newPassword = "This field can't be empty"
  } else if (input.newPassword.trim().length < 8) {
    errors.newPassword = 'It must must have at least 8 characters'
  } else if (!/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/.test(input.newPassword)) {
    errors.newPassword = 'It must have an uppercase, a lowercase and a digit'
  }
  if (!input.confirmPassword) {
    errors.confirmPassword = 'Confirm your password'
  } else if (input.newPassword !== input.confirmPassword) {
    errors.confirmPassword = 'Passwords must be the same'
  }
  return errors
}

export default function UserEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const user = useSelector((state) => state.user.currentUser);
  const {
    type: type1,
    value: image1,
    sizeExceeded: sizeExceeded1,
    setSizeExceeded: setSizeExceeded1,
    loading: loading1,
    onChange: onChange1,
  } = useImage({ type: "file" });
  const {
    type: type2,
    value: image2,
    sizeExceeded: sizeExceeded2,
    setSizeExceeded: setSizeExceeded2,
    loading: loading2,
    onChange: onChange2,
  } = useImage({ type: "file" });

  const [inputs, setInputs] = useState({
    username: user?.username,
    fullName: user?.fullName,
    profilePhoto: user?.profilePhoto || "",
    backgroundPhoto: user?.backgroundPhoto || "",
    artist: user?.artist ? true : false,
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [userPlatform, setUserPlatform] = useState(true);

  useEffect(async () => {
    const res = await axios.get(`api/password/?email=${user.email}`);
    console.log(user.email)
    console.log(res.data)
    res.data.msg!=="User must log in through Google/Microsoft" && setUserPlatform(false);
  }, []);

  function handleArtist() {
    setInputs({ ...inputs, artist: !inputs.artist })
    console.log(inputs)
  }

  function handleInputChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    image1 &&
      setInputs({
        ...inputs,
        profilePhoto: image1,
      });
  }, [image1]);

  useEffect(() => {
    image2 &&
      setInputs({
        ...inputs,
        backgroundPhoto: image2,
      });
  }, [image2]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!errors.oldPassword && !errors.newPassword && !errors.confirmPassword) {
      let option = window.confirm("Are you sure you want to edit your profile?")
      if (option === true) {
        if (password.oldPassword !== "") {
          try {
            const verified = await axios.post("/api/login", { email: user.email, password: password.oldPassword });
            await axios.put(`/api/user/${user._id}`, { password: password.confirmPassword })
          } catch (error) {
            alert("Wrong old password")
          }
        }
        updateUsers(
          dispatch,
          currentUser._id,
          inputs,
          currentUser.accessToken
        ).then((res) => {
          navigate(`/users/${currentUser._id}`);
        });
        setInputs({
          username: "",
          fullName: "",

          profilePhoto: "",
          backgroundPhoto: "",
        });
      } else {
        alert("Cancelled")
      }
    }
  }
  function handlePaswordChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value })
    setErrors(validar({ ...password, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    if (sizeExceeded1 || sizeExceeded2) {
      Toast.fire({
        icon: "error",
        title: "File size exceeded",
      });
      setSizeExceeded1(false);
      setSizeExceeded2(false);
    }
  }, [sizeExceeded1, sizeExceeded2, setSizeExceeded1, setSizeExceeded2]);

  return (
    <div id={styles.editCont}>
      <form id={styles.editForm} onSubmit={(e) => handleSubmit(e)}>

        <div id={styles.rowEditsCont}>
          <div id={styles.textEdits}>
            <div className={styles.editShell}>
              <label className={styles.editLabel}>Username: </label>

              <input className={styles.editInput} name="username" type="text" placeholder={user?.username} onChange={handleInputChange} />
            </div>

            <div className={styles.editShell}>
              <label className={styles.editLabel}>FullName: </label>
              <input className={styles.editInput} name="fullName" type="text" placeholder={user?.fullName} onChange={handleInputChange} />
            </div>
            {!userPlatform && <div id={styles.passwordCont}>
              <div className={styles.editShell}>
                <label className={styles.editLabel}>Old password: </label>
                <input className={styles.editInput} name="oldPassword" type="password" onChange={handlePaswordChange} value={password.oldPassword} />
                {errors.oldPassword && <span className={styles.error}>{errors.oldPassword}</span>}
              </div>
              <div className={styles.editShell}>
                <label className={styles.editLabel}>New password:</label>
                <input className={styles.editInput} name="newPassword" type="password" onChange={handlePaswordChange} value={password.newPassword} />
                {errors.newPassword && <span className={styles.error}>{errors.newPassword}</span>}
              </div>
              <div className={styles.editShell}>
                <label className={styles.editLabel}>Confirm new password:</label>
                <input className={styles.editInput} name="confirmPassword" type="password" onChange={handlePaswordChange} value={password.confirmPassword} />
                {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
              </div>
            </div>}
          </div>

          <div id={styles.imagesEdits}>
            <div className={styles.editShell}>
              <label className={styles.editLabel}>Background Image: </label>

              <div id={styles.currentImgBackCont}>
                {loading2 ? (<img id={styles.currentImgBack} src="/default_banner_photo.svg" alt="not found" />) : (<img id={styles.currentImgBack} src={!image2 ? inputs?.backgroundPhoto || DefaultProfile : image2} alt="banner" />)}
              </div>

              <div className={styles.decoFileInput}>Change Background</div>

              <input className={styles.editInputFile} type={type2} id="file2" onChange={onChange2} />
            </div>

            <div className={styles.editShell}>
              <label className={styles.editLabel}>Profile Photo: </label>

              <div id={styles.currentImgProfileCont}>
                <div>{loading1 ? (<img id={styles.currentImgProfile} src="https://acegif.com/wp-content/uploads/loading-25.gif" alt="not found" />) : (<img id={styles.currentImgProfile} src={!image1 ? inputs?.profilePhoto || DefaultProfile : image1} alt="profile" />)}</div>
              </div>

              <div className={styles.decoFileInput}>Change Profile</div>

              <input className={styles.editInputFile} type={type1} id="file1" onChange={onChange1} />
            </div>
          </div>
        </div>

        <div id={styles.artistChoice}>
          <p>Are You an Artist?</p>
          <div id={inputs.artist ? styles.SliderShellOn : styles.SliderShellOff} onClick={handleArtist}>
            <div id={inputs.artist ? styles.sliderOn : styles.sliderOff}></div>
          </div>
        </div>

        {!loading1 && !loading2 && (<button id={styles.editSubmit} type="submit"> Save Changes </button>)}
      </form>
    </div>
  );
}
