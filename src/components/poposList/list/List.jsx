import React from 'react'
import './List.css'
function List({country,city,image}) {
  return (
       <div className="list">
      <img src={image.src} width="300" height="300" alt={image.alt} />
      <h1>{country}</h1>
      <div>{city}</div>
    </div>
  )
}

export default List
