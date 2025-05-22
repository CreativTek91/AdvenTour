import axios from 'axios';
import { useState } from 'react';


function MediaUpload({ onUpload }) {
    const [files, setFiles] = useState([]);
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);

    const handleFileChange = (e) => {
        console.log(e.target.files);
        if (e.target.files) {
            setFiles((prev) => [...prev, ...e.target.files]);
        }else{
setError("No files selected");
        }
    }
    
     const handleUpload = async()=>{
  if(files.length===0) return;

  const formData = new FormData();
for(let file of files){
  formData.append("files", file);
}
  console.log("formData", formData);

  try {
    await axios.post(
      " import.meta.env.VITE_BACKEND_URL/media/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    onUpload();
    setFiles([])
  } catch (error) {
    console.log(error)
  }
 }
 

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple/>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default MediaUpload



 