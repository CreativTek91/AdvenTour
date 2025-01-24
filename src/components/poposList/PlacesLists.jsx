import React from 'react'
import List from './list/List'
import  './PlacesLists.css';
const places=[
  {country:'Austria',
    city:'Vienna',
    image:{
    src:"/images/Australia_1.jpg",
    alt:"Austria"
  }},
  {country:'Australia',
    city:'Sydney',
    image:{
    src:"/images/Australia_2.jpg",
    alt:"Australia"
  }},
  {country:'France',
    city:'Paris',
    image:{
    src:"/images/Australia_3.jpeg",
    alt:"France"
  }},
  {country:'Austria',
    city:'Vienna',
    image:{
    src:"/images/Australia_1.jpg",
    alt:"Austria"
  }},
  {country:'Australia',
    city:'Sydney',
    image:{
    src:"/images/Australia_2.jpg",
    alt:"Australia"
  }},
  {country:'France',
    city:'Paris',
    image:{
    src:"/images/Australia_3.jpeg",
    alt:"France"
  }},
]
function PlacesLists() {
  return (
    <>
    <h1>Keep your eye on this space for future content...</h1>
    <div className="placesList">
      {places.map((place)=>(
        <List key={crypto.randomUUID()} country={place.country} city={place.city} image={place.image} />
      ))}
      
    
      
    </div>
    </>
  )

}

export default PlacesLists










