import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postPost, getCategories } from "../redux/actions/PostPost"
import { useParams } from "react-router-dom"


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
    const [errors, setErrors] = useState({})
    const categories = useSelector((state) => state.categories.posts)

    const [input, setInput] = useState({
        userid: id,
        image: "",
        title: "",
        description: "",
        categories: []
    })

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    function handleImgChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.files[0],
          })
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
        dispatch(postPost(id, input))
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                    <div>
                        <label>Image:</label>
                        <input onChange={e => handleImgChange(e)} type="file" name="image" value={input.image}/>
                    </div>
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
                    <div>
                        <label>Categories:</label>
                        <select
                            id='categories'
                            name='categories'
                            onChange={(e) => handleSelect(e)}
                            required
                        >
                            <option value='categories'>Categories...</option>
                            {categories.map((c) => (
                            <option value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

            <button type='submit'>Publish</button>
        </form>
    )
}