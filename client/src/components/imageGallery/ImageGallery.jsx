// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./imageGallery.css";
// export default function ImageGallery() {
//   const [media, setMedia] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchMedia();
//   }, []);

//   const fetchMedia = async () => {
//     try {
//       const resp = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/media`);
//       setMedia(resp.data);
//     } catch (err) {
//       console.log("Error", err.response.data.error);
//       setError(err.response.data.error);
//       setMedia([]);
//     }
//   };

//   const deleteMedia = async (id) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/media/${id}`);
//       setMedia((prevMedia) => prevMedia.filter((item) => item._id !== id));
//     } catch (error) {
//       console.error({ error });
//     }
//   };

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//       {media?.length ? (
//         media.map((med) => (
//           <div
//             key={med._id}
//             className="flex flex-col items-center justify-center mx-auto lg:py-0 bg-glass my-10 w-48"
//           >
//             {med.public_id}
//             {med.type === "image" && (
//               <img src={med.url} alt="idkshitpost" className="" />
//             )}
//             {med.type === "video" && (
//               <video controls muted className="">
//                 <source src={med.url} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             )}
//             <button
//               className="btnAdminMedia"
//               onClick={() => deleteMedia(med._id)}
//             >
//               Delete
//             </button>
//             <button  className="btnAdminMedia">
//               Add
//             </button>
//           </div>
//         ))
//       ) : (
//         <p>No images find</p>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import "./imageGallery.css";
export default function ImageGallery() {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const resp = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/media`);
      if (!resp.data || resp.data.length === 0) {
        setError("No media found");
        return;
      }
      setMedia(resp.data);
    } catch (err) {
      console.log("Error", err.response.data.error);
      setError(err.response.data.error);
      setMedia([]);
    }
  };

  const deleteMedia = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/media/${id}`);
      setMedia((prevMedia) => prevMedia.filter((item) => item._id !== id));
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
      {media?.length ? (
        media.map((med) => (
          <div
            key={med._id}
            className="flex flex-col items-center justify-center mx-auto lg:py-0 bg-glass my-10 w-48 h-48 rounded-lg shadow-lg"
          >
            {
            
            med.type ? (
              med.type === "image" ? (
                <img src={med.url} alt={med.url} className="imgGallery" />
              ) : (
                <video controls muted className="videoGallery">
                  <source src={med.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              <img src={med.url} alt={med.url} className="imgGallery" />
            )}
            <div>
              <button
                className="btnAdminMedia"
                onClick={() => deleteMedia(med._id)}
              >
                Delete
              </button>
              <button className="btnAdminMedia">Add To Trip</button>
            </div>
          </div>
        ))
      ) : (
        <p>No images lole</p>
      )}
    </div>
  );
}