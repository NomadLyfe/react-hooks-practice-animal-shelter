import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });
  
  useEffect(() => {
    handleFindPetsClick();
  }, [])

  function handleFindPetsClick() {
    fetch("http://localhost:3001/pets")
    .then(r => r.json())
    .then(data => {
      const filteredData = data.filter(pet => {
        if (filters.type === 'all') {
          return true;
        } else {
          return pet.type === filters.type;
        }
      });
      setPets(filteredData);
    })
  }

  function handleAdoptPet(id) {
    const updatedPets = pets.map(pet => {
      if (pet.id === id) {
        return {...pet, isAdopted: true};
      } else {
        return pet;
      }
    })
    setPets(updatedPets);
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={setFilters} onFindPetsClick={handleFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;