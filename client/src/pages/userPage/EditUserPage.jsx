import MediaUpload from "../../components/mediaUpload/MediaUpload";
import {  useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function EditUserPage() {
  const navigate = useNavigate();
 const [name, setName] = useState("");
   const { user, setUser } = useAuthStore();
   const [avatarUrl, setAvatarUrl] = useState(null);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
   const handleAvatarUpload = (file) => {
     setAvatarUrl(file);
   };
   const handleSubmit = async (e) => {
     e.preventDefault();
     if ((!user?.id && !avatarUrl) || (!user?.id && name)) return;
     const formData = new FormData();
     formData.append("avatar", avatarUrl);
     if (name) {
       formData.append("name", name);
     }
     try {
       const response = await axios.patch(
         `${import.meta.env.VITE_BACKEND_URL}/${user.id}`,
         formData,
         {
           headers: {
             "Content-Type": "multipart/form-data",
           },
         }
       );
       setSuccess(response?.data?.message);
       console.log("submit", response.data.user);
 
       setUser(response.data.user);
        navigate('/profile/id');
     } catch (error) {
       setError(
         error.response?.data?.message ||
           "An error occurred while updating the profile."
       );
     } finally {
       setTimeout(() => {
         setError(null);
         setSuccess(null);
         setName("");
         setAvatarUrl(null);
       }, 2000);
     }
   };
 

  return (
    <div className="flex flex-col justify-center  items-center p-4 relative ">
      <h1 className="md:text-2xl md:font-bold md:mb-4">Edit Profile</h1>
      <section>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
      </section>
      <section>
        <label htmlFor="name">
          Change Name
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(() => e.target.value)}
            className="border border-[#0a330c] rounded-md p-2 mb-2 w-full  max-w-xs"
          />
        </label>
      </section>
      <section className="flex flex-col justify-between items-center md:flex-row max-w-md">
        <button className="btn">
          <MediaUpload
            onUpload={handleAvatarUpload}
            label="Choose Avatar"
            accept="image/*"
            multiple={false}
          />
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!avatarUrl && !name}
          className="btn "
        >
          Update
        </button>
        {avatarUrl && (
          <div className="pre-avatar-container ">
            <img src={URL.createObjectURL(avatarUrl)} alt="Avatar Preview" />
          </div>
        )}
      </section>
      <button className="btn" onClick={() => navigate("/profile/id")}>
        Back
      </button>
    </div>
  );
}

export default EditUserPage
