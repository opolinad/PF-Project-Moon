import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAsync } from "../ReduxToolkit/apiCalls/categoriesCall.js"
import { postPost } from "../ReduxToolkit/apiCalls/postCall.js"
import { useImage } from "../hooks/useImage";
import style from "./PostPost.module.css"
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp,faAngleUp, faRocket, faTimes } from "@fortawesome/free-solid-svg-icons";

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

export default function PostPost(){
    // const history = useNavigate()
    const dispatch = useDispatch()
    const [profile, setProfile] = useState(null)
    const [errors, setErrors] = useState({})
    const { type: type1, value: image1, loading: loading1, onChange: onChange1 } = useImage({ type: 'file' })
    const user = useSelector(state => state.user.currentUser)
    const categories = useSelector((state) => state.categories.posts.categories)

    const [showCreate,setShowCreate] = useState(false);


    const [input, setInput] = useState({
        user: user._id,
        image: "",
        title: "",
        description: "",
        categories: []
    })


    // const upImage = (e) => {
    //     e.preventDefault()
    //     //Para que las imagen con el mismo nombre no se pisen
    //     const fileName = new Date().getTime() + profile.name
    //     //Traer del storage los datos
    //     const storage = getStorage(app)
    //     //Referencia
    //     const sotorageRef = ref(storage, fileName)
    //     //COnfiguracion de Firebase para los File y conseguir la URL
    //     const uploadTask = uploadBytesResumable(sotorageRef, profile);

    //     // Register three observers:
    //     // 1. 'state_changed' observer, called any time the state changes
    //     // 2. Error observer, called on failure
    //     // 3. Completion observer, called on successful completion
    //     uploadTask.on('state_changed',
    //         (snapshot) => {
    //             // Observe state change events such as progress, pause, and resume
    //             // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             console.log('Upload is ' + progress + '% done');
    //             switch (snapshot.state) {
    //                 case 'paused':
    //                     console.log('Upload is paused');
    //                     break;
    //                 case 'running':
    //                     console.log('Upload is running');
    //                     break;
    //                 default:
    //             }
    //         },
    //         (error) => {
    //             // Handle unsuccessful uploads
    //         },
    //         () => {
    //             // Handle successful uploads on complete
    //             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 setInput({
    //                     ...input,
    //                     image: downloadURL
    //                 })
    //                 // setActive(false)
    //                 // const updateUser = { ...inputs, profilePhoto: downloadURL };
    //                 // console.log(updateUser);
    //                 // addProduct(product, dispatch).then(response => {
    //                 //     history.push('/products')
    //                 // })
    //             });
    //         }
    //     );
    // }

    useEffect(() => {
        getCategoriesAsync(dispatch)
    }, [dispatch])

    function handleDeSelect(e)
    {
        setInput({
            ...input,
            categories: input.categories.filter(element => element!=e.target.value)
          })
          setErrors(validate({
                ...input,
                [e.target.name]: e.target.value,
              }))
    }

    // function handleImgChange(e) {
    //     setProfile(e.target.files[0])
    //     setActive(true)
    // }

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
        postPost(dispatch, user._id, input, user.accessToken)
        setInput({
            user: user._id,
            image: "",
            title: "",
            description: "",
            categories: []
        })
    }

      
    console.log(profile)

    let CreateCss= showCreate? css.openCreate : css.closeCreate;

    return (
      <div id={css.createCont}>
            <button onClick={()=>setShowCreate(!showCreate)} id={css.CreateButShow}> <FontAwesomeIcon id={css.rocketUp} icon={faRocket}/><FontAwesomeIcon id={css.AngleUpUp} icon={faAngleUp}/><FontAwesomeIcon id={css.chevronUp} icon={faChevronCircleUp}/><FontAwesomeIcon id={css.AngleUpDown} icon={faAngleUp}/></button>
            
        <form className={style.color} onSubmit={(e) => handleSubmit(e)}>
            <div>
                    {/* <div>
                        <label>Image:</label>
                        <input 
                        onChange={e => handleImgChange(e)} 
                        type="file" 
                        name="image" 
                    />
                    </div> */}
                    <div>
                    <label>Image: </label>
                        
                        <div style={{ width: '150px', height: '150px', position: 'relative', margin: '20px' }} >
                            {
                                input?.image && loading1 ?
                                    <img src="https://acegif.com/wp-content/uploads/loading-25.gif" style={{ width: "100%", height: '100%', objectFit: 'cover' }} /> :
                                    <img src={!image1 ? input?.image : image1} alt="Img" style={{ width: "100%", height: '100%', objectFit: 'cover' }} />
                            }


                    <input
                        type={type1}
                        id="file1"
                        onChange={onChange1}
                    />
                </div>
                    {/* <div><button onClick={(e) => upImage(e)}>UPLOAD IMAGE</button></div> */}
                    <div>
                        <label>Title:</label>
                        <input onChange={e => handleChange(e)} type="text" name="title" value={input.title}/>
                        {errors.title && (
                        <span className='error'>
                            <small>{errors.title}</small>
                        </span>
                        )}
                    </div>
                    <div>
                        <label>Description:</label>
                        <input onChange={e => handleChange(e)} type="text" name="description" value={input.description}/>
                        {errors.description && (
                        <span className='error'>
                            <small>{errors.description}</small>
                        </span>
                        )}
                    </div>
                        <div className={css.infoContCat}>
                            <select className={css.labelInputCat} id='categories' name='categories' onChange={(e) => handleSelect(e)} required>
                                <option value='categories'> Choose the categories </option>
                                {categories.map((c,i) => (
                                    <option key={"category_option_"+i} className={css.optionCat} value={c}>{c}</option>
                                ))}
                            </select>
                            <div className={css.selectedCont}>
                                {input.categories.map((element,index)=><button onClick={(e)=>handleDeSelect(e)} className={css.categorySelected} key={"selected_cat_"+index} value={element}>{element} <FontAwesomeIcon icon={faTimes}/></button>)}
                            </div>
                        </div>
                {/* <div>
                        <label>
                            Categories:
                        </label>
                        <select 
                            id='categories'
                            name='categories'
                            onChange={(e) => handleSelect(e)}
                            required
                        >
                            <option value='categories'> Choose some categories </option>
                            {categories.map((c,i) => (
                                <option key={"categories_Post"+i} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>*/}
                </div>
                <button  type="submit" >SUBMIT</button>
        </form>
    </div>



//    console.log(profile)
//
//    let CreateCss= showCreate? css.openCreate : css.closeCreate;
//
//    return (
//        <div id={css.createCont}>
//            <button onClick={()=>setShowCreate(!showCreate)} id={css.CreateButShow}> <FontAwesomeIcon id={css.rocketUp} icon={faRocket}/><FontAwesomeIcon id={css.AngleUpUp} icon={faAngleUp}/><FontAwesomeIcon id={css.chevronUp} icon={faChevronCircleUp}/><FontAwesomeIcon id={css.AngleUpDown} icon={faAngleUp}/></button>
//            
//            <form id={CreateCss} onSubmit={(e) => handleSubmit(e)}>
//                <div id={css.innerCreateCont}>
//
//                        {/* <div><button onClick={(e) => upImage(e)}>UPLOAD IMAGE</button></div> */}
//                        <div className={css.infoCont}>
//                            <input className={css.labelInputTitle} onChange={e => handleChange(e)} placeholder="Title" type="text" name="title" value={input.title}/>
//                            {errors.title && (
//                            <span className={css.labelSpan}>
//                                <small>{errors.title}</small>
//                            </span>
//                            )}
//                        </div>
//
//                        <div className={css.infoCont}>
//                            <textarea className={css.labelInputDescription} onChange={e => handleChange(e)} placeholder="Description" type="text" name="description" value={input.description}/>
//                            {errors.description && (
//                            <span className={css.labelSpan}>
//                                <small>{errors.description}</small>
//                            </span>
//                            )}
//                        </div>
//
//                        <div id={css.imgUpCont}>
//                            <div className={css.labelImgUpload}>Upload Images</div>
//                            <input className={css.labelInputImg} onChange={e => handleImgChange(e)} type="file" title=" " name="image"/>
//                        </div>
//
//                        <div className={css.infoCont}>
//                            <label className={css.labelInfo}>Categories:</label>
//                            <select className={css.labelInput} id='categories' name='categories' onChange={(e) => handleSelect(e)} required>
//                                <option value='categories'> Choose the categories </option>
//                                {categories.map((c) => (
//                                    <option value={c}>{c}</option>
//                                ))}
//                            </select>
//                        </div>
//
//                    </div>
//                    {active ? (<button id={css.submitBut}  type="submit" >SUBMIT</button>) : (<><p >Imagen subiendo</p></>)}
//            </form>
//
//
//        </div>
    )
}