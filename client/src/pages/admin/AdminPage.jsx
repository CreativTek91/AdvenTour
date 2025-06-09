import { useState } from 'react';
import AddTrip from './AddTrip';
import Search from '../search/Search';
import ImageGallery from '../../components/imageGallery/ImageGallery';
import TripCardAdmin from './TripCardAdmin';
import Sidebar from '../../components/sideBar/SideBar';

function AdminPage() {
  const [refresh, setRefresh] = useState(false);

  const onUpload = () => {
    setRefresh(!refresh);
  };
  
  return (
    <div className="container mx-auto p-4 items-center relative">
        <TripCardAdmin />
        <AddTrip />
        <ImageGallery />
     
    </div>
  );
}

export default AdminPage
