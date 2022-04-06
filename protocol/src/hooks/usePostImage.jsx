import { useEffect, useState } from "react";
import app from "../Firebase/Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const usePostImage = ({ type }) => {
  const [file, setFile] = useState([]);
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(null);
  const [sizeExceeded, setSizeExceeded] = useState(false);

  const onChange = (e) => {
    // setFile(e.target.files[0]);
    for (let i=0 ; i <= e.target.files.length ; i++){
       const newImage = e.target.files[i]
       setFile((state) => [...state, newImage])
    }
  };
   const setNullFile =()=>{
        setValue([]);
    }

  useEffect(() => {
    file.forEach((f) => {
    if (f) {
      if (f.size > 12000000) {
        setSizeExceeded(true);
      } else {
        setLoading(true);
        const fileName = new Date().getTime() + f.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, f);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setValue((prev) => [...prev, downloadURL]);
              setLoading(false);
            });
          }
        );
      }
    }
  })
  }, [file]);


  return {
    type,
    value,
    sizeExceeded,
    setSizeExceeded,
    loading,
    onChange,
    setNullFile
  };
};
