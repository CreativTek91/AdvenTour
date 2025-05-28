import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import MediaUpload from "../../components/mediaUpload/MediaUpload";
import axios from "axios";
import Error from "../../components/errors/Error";
import Success from "../../components/success/Success";
function Profile() {
  const { user, fetchUserById } = useAuthStore();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  useEffect(() => {
    if (user?._id) {
      fetchUserById(user._id);
    }
  }, [fetchUserById, user?._id]);
  const handleAvatarUpload = (file) => {
    setAvatarUrl(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatarUrl || !user?._id) return;
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
      setSuccess(response?.data?.message);
      fetchUserById(user._id);
      setAvatarUrl(null);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while updating the profile."
      );
    }
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 2000);
  };
  return (
    <div className="flex flex-col justify-center items-center relative">
      {user?.avatar && (
        <img
          src={user.avatar.url}
          alt="avatar"
          className="w-[6rem] h-[6rem] rounded-full"
        />
      )}
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>
        Joined:{" "}
        {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
      </p>
      {avatarUrl && (
        <div className="w-[20rem] h-[20rem] top-10 right-10 absolute">
          <img
            src={URL.createObjectURL(avatarUrl)}
            alt="Avatar Preview"
            className="avatar"
          />
        </div>
      )}
      <button>
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
        disabled={!avatarUrl}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Upload Avatar
      </button>
      {error && <Error error={error} />}
      {success && <Success success={success} />}
    </div>
  );
}
export default Profile;
