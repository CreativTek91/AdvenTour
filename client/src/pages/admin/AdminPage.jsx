import { useState } from 'react';
import AddTrip from '../trips/AddTrip'
import MediaUpload from '../../components/mediaUpload/MediaUpload'
import Sidebar from '../../components/sideBar/SideBar';
import ImageGallery from '../../components/imageGallery/ImageGallery';
function AdminPage() {
  const [refresh, setRefresh] = useState(false);

  const onUpload = () => {
    setRefresh(!refresh);
  };
  return (
    <div>
      <Sidebar />
     <ImageGallery  />
      <AddTrip />
    </div>
  )
}

export default AdminPage
