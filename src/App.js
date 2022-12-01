import { useState, useEffect } from 'react';

import './App.scss';
import Species from './Species';

const API_URL = 'https://swapi.dev/api/films/2/';

const SPECIES_IMAGES = {
  droid:
    'https://static.wikia.nocookie.net/starwars/images/f/fb/Droid_Trio_TLJ_alt.png',
  human:
    'https://static.wikia.nocookie.net/starwars/images/3/3f/HumansInTheResistance-TROS.jpg',
  trandoshan:
    'https://static.wikia.nocookie.net/starwars/images/7/72/Bossk_full_body.png',
  wookie:
    'https://static.wikia.nocookie.net/starwars/images/1/1e/Chewbacca-Fathead.png',
  yoda: 'https://static.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png',
};

const CM_TO_IN_CONVERSION_RATIO = 2.54;

function App() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardData = [];
        // Fetch all data
        const data = await fetch(API_URL);
        const jsonData = await data.json();
        // Get species
        const species = jsonData.species;

        for await (const specieURL of species) {
          const specieData = await fetch(specieURL);
          const jsonSpecieData = await specieData.json();
          cardData.push(jsonSpecieData);
        }

        return cardData;
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData()
      .then(data => {
        setCardsData(data);
        console.log(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1>Empire Strikes Back - Species Listing</h1>
      <div className="App-species">
        {cardsData.map((element, index) => {
          return (
            <Species
              key={index}
              name={element.name}
              classification={element.classification}
              designation={element.designation}
              height={`${Math.round(
                element.average_height / CM_TO_IN_CONVERSION_RATIO
              ).toString(10)}"`}
              image={
                element.name === "Yoda's species"
                  ? SPECIES_IMAGES['yoda']
                  : SPECIES_IMAGES[element.name.toLowerCase()]
              }
              numFilms={element.films.length}
              language={element.language}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
