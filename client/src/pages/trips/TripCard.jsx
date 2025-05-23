import './tripCard.css';

function TripCard({trip}) {
  return (
    <div className="card">
      <h2 className="font-semibold">{trip.title}</h2>
      <ul className="flex flex-col sm:flex-row p-2 mx-auto gap-4">
        {trip.media?.length > 0 &&
          trip.media.map((m) => {
            return (
              <li className="flex size-48" key={m.url}>
                {console.log(m.url)}
                <img src={m.url} alt={trip.title} className="w-full " />
              </li>)
          })}
      </ul>
      <p>{trip.description}</p>
      <p>Preis: {trip.price} €</p>
     
    </div>
  );
}

export default TripCard;
