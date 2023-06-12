import React from "react";
import Pet from "./Pet";

function PetBrowser({ pets, onAdoptPet }) {
  if (!pets) {
    return <p>Loading...</p>
  }
  const petList = pets.map(pet => {
    return (
      <Pet key={pet.id} pet={pet} onAdoptPet={onAdoptPet} />
    )
  })
  return <div className="ui cards">{petList}</div>;
}

export default PetBrowser;