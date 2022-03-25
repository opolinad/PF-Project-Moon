import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import app from '../Firebase/Firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { getCategoriesAsync } from "../ReduxToolkit/apiCalls/categoriesCall.js"
import { postPost } from "../ReduxToolkit/apiCalls/postCall.js"
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp,faAngleUp, faRocket } from "@fortawesome/free-solid-svg-icons";

import css from "./PostPost.module.css";


function validate(input){
    let errors = {}

    if (!input.description) {
        errors.description = 'Description cannot be empty.'
    }
    if (!input.categories) {
        errors.categories = 'Categories cannot be empty.'
    }   

return errors
}

export default function PostPost() {

    const dispatch = useDispatch()

    const { id } = useParams()

    // const history = useNavigate()
    const [profile, setProfile] = useState(null)
    const [active, setActive] = useState(false)
    const [errors, setErrors] = useState({})
    const user = useSelector(state => state.user.currentUser)
    const categories = useSelector((state) => state.categories.posts.categories)

    const [showCreate,setShowCreate] = useState(false);


    const [input, setInput] = useState({
        userid: id,
        image: "",
        title: "",
        description: "",
        categories: []
    })


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
                    setInput({
                        ...input,
                        image: downloadURL
                    })
                    // setActive(false)
                    // const updateUser = { ...inputs, profilePhoto: downloadURL };
                    // console.log(updateUser);
                    // addProduct(product, dispatch).then(response => {
                    //     history.push('/products')
                    // })
                });
            }
        );
    }

    useEffect(() => {
        getCategoriesAsync(dispatch)
    }, [dispatch])



    function handleImgChange(e) {
        setProfile(e.target.files[0])
        setActive(true)
    }

    function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
          }))
    }
  
    function handleSelect(e) {
      setInput({
        ...input,
        [e.target.name]: [...input.categories, e.target.value]
      })
      setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
          }))
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
        upImage(e)
        postPost(dispatch, user._id, input, user.accessToken)
    }
    console.log(profile)

    let CreateCss= showCreate? css.openCreate : css.closeCreate;

    return (
        <div id={css.createCont}>
            <button onClick={()=>setShowCreate(!showCreate)} id={css.CreateButShow}> <FontAwesomeIcon id={css.rocketUp} icon={faRocket}/><FontAwesomeIcon id={css.AngleUpUp} icon={faAngleUp}/><FontAwesomeIcon id={css.chevronUp} icon={faChevronCircleUp}/><FontAwesomeIcon id={css.AngleUpDown} icon={faAngleUp}/></button>
            
            <form id={CreateCss} onSubmit={(e) => handleSubmit(e)}>
                <div id={css.innerCreateCont}>

                        {/* <div><button onClick={(e) => upImage(e)}>UPLOAD IMAGE</button></div> */}
                        <div className={css.infoCont}>
                            <input className={css.labelInputTitle} onChange={e => handleChange(e)} placeholder="Title" type="text" name="title" value={input.title}/>
                            {errors.title && (
                            <span className={css.labelSpan}>
                                <small>{errors.title}</small>
                            </span>
                            )}
                        </div>

                        <div className={css.infoCont}>
                            <textarea className={css.labelInputDescription} onChange={e => handleChange(e)} placeholder="Description" type="text" name="description" value={input.description}/>
                            {errors.description && (
                            <span className={css.labelSpan}>
                                <small>{errors.description}</small>
                            </span>
                            )}
                        </div>

                        <div id={css.imgUpCont}>
                            <div className={css.labelImgUpload}>Upload Images</div>
                            <input className={css.labelInputImg} onChange={e => handleImgChange(e)} type="file" title=" " name="image"/>
                        </div>

                        <div className={css.infoCont}>
                            <label className={css.labelInfo}>Categories:</label>
                            <select className={css.labelInput} id='categories' name='categories' onChange={(e) => handleSelect(e)} required>
                                <option value='categories'> Choose the categories </option>
                                {categories.map((c) => (
                                    <option value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    {active ? (<button id={css.submitBut}  type="submit" >SUBMIT</button>) : (<><p >Imagen subiendo</p></>)}
            </form>


        </div>
        
    )
}