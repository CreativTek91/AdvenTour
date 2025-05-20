import './tripCard.css';
function TripCard({trip}) {
  return (
   
      <div className="card">
        <h2 className="font-semibold">{trip.title}</h2>
        <ul className="flex flex-col sm:flex-row p-2 mx-auto gap-4 ]">
          {trip.media.length > 0 &&
            trip.media.map((m) => {
              return m.type === "image" ? (
                <li className="flex size-48" key={m.url}>
                  <img src={m.url} alt={trip.title} className="size-48 " />
                </li>
              ) : (
                <li className="flex size-48 " key={m.url}>
                  <video controls muted className="">
                    <source src={m.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </li>
              );
            })}
        </ul>
        <p>Des {trip.description}</p>
        <p>Price: {trip.price} €</p>
      </div>
   
  );
}

export default TripCard;
