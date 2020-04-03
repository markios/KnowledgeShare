import React from 'react';

export default ({name, dob, location}) => {
  return (
    <>
      <h3>{name.title} {name.first} {name.last}</h3>
      <p><strong>Age: </strong> {dob.age}</p>
      <p><strong>City: </strong>{location.city}</p>
      <p><strong>Country: </strong>{location.country}</p>
    </>
  );
}