// import axios from 'axios';
// import { useState } from 'react';


// function MediaUpload({ onUpload }) {
//     const [files, setFiles] = useState([]);
// const [error, setError] = useState(null);
// const [success, setSuccess] = useState(null);

//     const handleFileChange = (e) => {
//         console.log(e.target.files);
//         if (e.target.files) {
//             setFiles((prev) => [...prev, ...e.target.files]);
//         }else{
// setError("No files selected");
//         }
//     }
    
//      const handleUpload = async()=>{
//   if(files.length===0) return;

//   const formData = new FormData();
// for(let file of files){
//   formData.append("files", file);
// }
//   console.log("formData", formData);

//   try {
//     await axios.post(
//       " import.meta.env.VITE_BACKEND_URL/media/upload",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     onUpload();
//     setFiles([])
//   } catch (error) {
//     console.log(error)
//   }
//  }
 

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} multiple/>
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }

// export default MediaUpload



import { useState } from 'react';


function MediaUpload({ onUpload, label = "Datei hochladen", accept = "image/*", multiple = true}) {
   const [files, setFiles] = useState([]);

const handleChange = (event) => {
  const file = multiple ? event.target.files : event.target.files[0];
  onUpload(file);
  setFiles([]);
};

//     const handleFileChange = (e) => {
//         console.log(e.target.files);
//         if (e.target.files) {
//             setFiles((prev) => [...prev, ...e.target.files]);
//         }else{
// setError("No files selected");
//         }
//     }
    
//      const handleUpload = async()=>{
//   if(files.length===0) return;

//   const formData = new FormData();
// for(let file of files){
//   formData.append("files", file);
// }
//   console.log("formData", formData);

//   try {
//     await axios.post(
//       " import.meta.env.VITE_BACKEND_URL/media/upload",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     onUpload();
//     setFiles([])
//   } catch (error) {
//     console.log(error)
//   }
//  }
 

  return (
  
      <label>
        {label}
        <input type="file" accept={accept}  onChange={handleChange} multiple  value={files} hidden/>
        {/* <button onClick={handleUpload}>Upload</button> */}
      </label>
  
  );
}

export default MediaUpload













// import axios from 'axios';
// import { useState } from 'react';


// function MediaUpload({ onUpload, label = "Datei hochladen", accept = "image/*", multiple = true}) {
//     const [files, setFiles] = useState([]);
// const handleChange = (event) => {
//   const file = multiple ? event.target.files : event.target.files[0];
//   onUpload(file);
// };

// //     const handleFileChange = (e) => {
// //         console.log(e.target.files);
// //         if (e.target.files) {
// //             setFiles((prev) => [...prev, ...e.target.files]);
// //         }else{
// // setError("No files selected");
// //         }
// //     }
    
//      const handleUpload = async()=>{
//   if(files.length===0) return;

//   const formData = new FormData();
// for(let file of files){
//   formData.append("files", file);
// }
//   console.log("formData", formData);

//   try {
//     await axios.post(
//       " import.meta.env.VITE_BACKEND_URL/media/upload",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     onUpload();
//     setFiles([])
//   } catch (error) {
//     console.log(error)
//   }
//  }
 

//   return (
//     <div>
//       <label>
//         {label}
//         <input type="file" accept={accept}  onChange={handleFileChange} multiple  hidden/>
//         <button onClick={handleUpload}>Upload</button>
//       </label>
//     </div>
//   );
// }

// export default MediaUpload
 