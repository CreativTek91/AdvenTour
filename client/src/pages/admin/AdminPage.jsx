import { useState } from 'react';
import AddTrip from './AddTrip';

import ImageGallery from '../../components/imageGallery/ImageGallery';
import TripCardAdmin from './TripCardAdmin';

function AdminPage() {
  const [refresh, setRefresh] = useState(false);

  const onUpload = () => {
    setRefresh(!refresh);
  };
  
  return (
    <div>
      <TripCardAdmin />
      <AddTrip />
      {/* <ImageGallery /> */}

    </div>
  );
}

export default AdminPage
