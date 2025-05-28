import {useState} from 'react'
import useAuthStore from '../../store/useAuthStore'
import MediaUpload from '../../components/mediaUpload/MediaUpload'
import axios from 'axios';
import Sidebar from  '../../components/sideBar/SideBar'

function Profile() {
    const {user}=useAuthStore();
    const [avatarUrl,setAvatarUrl]=useState(null);
    console.log("user", user);
    if (!user) {
        return <div>Loading...</div>
    }
    const handleAvatarUpload=async(file)=>{
      // setAvatarUrl(URL.createObjectURL(file));
       setAvatarUrl(file);
      
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("avatarUrl", avatarUrl);

      const formData = new FormData();
      formData.append("avatar", avatarUrl);

      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/${user._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Profile updated successfully", response.data);
      } catch (error) {
        console.error("Error updating profile", error.message);
      }
    };
  return (
    <div className='flex flex-col justify-center items-center relative'>
      {user.avatar &&  <div><img src={user.avatar} alt="avatar" className='w-[6rem] h-[6rem] rounded-full'/></div>}
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
       {avatarUrl && <div className='w-[20rem] h-[20rem] top-10 right-10 absolute'><img src={URL.createObjectURL(avatarUrl)} alt="Avatar Preview" className='avatar'/></div>}
        <MediaUpload onUpload={handleAvatarUpload} label='Avatar choose' accept='image/*' multiple={false}/>
     <button type='submit' onClick={handleSubmit}>Update</button>
    </div>
  );
}

export default Profile
