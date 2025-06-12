// /AdvenTour/client/src/pages/trips/TripCard.jsx
import "./tripCard.css";

import useAuthStore from "../../store/useAuthStore";
import LikeButton from "../../components/likeButton/LikeButton";

function TripCard({ trip }) {

  const user=useAuthStore();
  return (
    <div className="card relative">
      <h2 className="font-semibold text-center">{trip.title}</h2>

      {/* Cloudinary‑Bild */}
      <ul className="flex flex-col sm:flex-row p-2 mx-auto gap-4">
        {trip.media?.length > 0 &&
          trip.media.map((m) => (
            <li className="flex size-48" key={m.url}>
              <img src={m.url} alt={trip.title} className="w-full object-cover" />
            </li>
          ))}
      </ul>

      <p className="text-center">{trip.description}</p>
      <p className="font-semibold text-center">Preis: {trip.price} €</p>
      <LikeButton tripId={trip._id} userId={user.id}/>
     
  
    </div>
  );
}

export default TripCard;
