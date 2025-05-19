import { useEffect, useState } from 'react';
import axios from 'axios';
import './imageGallery.css';
export default function ImageGallery() {
 const [media, setMedia] = useState([]);

 useEffect(() => {
  fetchMedia()
 },[]);

 const fetchMedia = async ()=> {
  try {
    const resp = await axios.get('http://localhost:8834/api/media');
    setMedia(resp.data);
    
  } catch (error) {
    console.log(error);
    setMedia([]);
  }

  }

  const deleteMedia = async(id)=>{
    try {
      await axios.delete(`http://localhost:8834/api/media/${id}`);
      setMedia((prevMedia) => prevMedia.filter((item) => item._id !== id));

    } catch (error) {
      console.error({error})
      
    }
  }



  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {media?.length ? (
        media.map((med) => (
          <div
            key={med._id}
            className="flex flex-col items-center justify-center mx-auto lg:py-0 bg-glass my-10 w-48"
          >
            {med.type === "image" && (
              <img src={med.url} alt="idkshitpost" className="" />
            )}
            {med.type === "video" && (
              <video controls muted className="">
                <source src={med.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <button
              className="btnAdminMedia"
              onClick={() => deleteMedia(med._id)}
            >
              Delete
            </button>
            <button onClick={""} className="btnAdminMedia">
              Add
            </button>
          </div>
        ))
      ) : (
        <p>No images lole</p>
      )}
    </div>
  );
}
