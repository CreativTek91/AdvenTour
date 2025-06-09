import { useEffect, useState } from "react";
import $api from '../../http/api';
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import './profile.css';
import Button from '../../components/button/Button';
const MyFavoritTrips = () => {
  const [trips, setTrips] = useState([]);
  const {user}=useAuthStore(); 
 const navigation=useNavigate();
 useEffect(() => {
    const fetchLikedTrips = async () => {
      try {
        const response = await $api.get(`/likes/my?userId=${user.id}`);
        console.log("Fetched liked trips:", response.data);
       
        setTrips(response.data);
        
      } catch (error) {
        console.error("Error fetching liked trips:", error.message);
      }
    };

    fetchLikedTrips();
  }
, [user.id]);

   
  return (
    <div className="flex flex-col items-center justify-start mt-4 w-full h-screen">
      <h2 className="text-center text-2xl ">My Favorit Trips</h2>
      {trips.length === 0 ? (
        <p>You have not liked any trips yet.</p>
      ) : (
        <ul className="fav-trip-list">
          {trips.map((trip) => {
            return (
           
              (
                <li key={trip._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                  <img src={trip.media[0].url} alt="trip" className="fav-im"/>
                  <h3>{trip.title}</h3>
                  <p>{trip.description}</p>
                </li>
                
              )
            );
          })}
        </ul>
      )}
      <Button
        onClick={() => navigation('/profile/id')}
      
      />
    </div>
  );
};
export default MyFavoritTrips;
