import React, { useEffect, useState } from 'react'
import app from '../Firebase/Firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export const useImage = ({ type }) => {
    const [file, setFile] = useState(null)
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(null)

    const onChange = (e) => {
        setFile(e.target.files[0])
    }

    useEffect(() => {
        if (file) {
            setLoading(true)
            const fileName = new Date().getTime() + file.name
            const storage = getStorage(app)
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setValue(downloadURL)
                        setLoading(false)
                    })
                }
            )
        }
    }, [file])

    return {
        type,
        value,
        loading,
        onChange,
    }
}
