import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '@fontsource/inter';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './search.css';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  // State to hold all fetched Pokémon data
  const [data, setData] = useState([]);
  // State for filtered Pokémon data during search
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();

  // Fetch Pokémon data from PokeAPI
  const fetchPokemon = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20")
      .then(async (response) => {
        const result = response.data.results;

        // Fetch details for each Pokémon in the result
        const pokemonDetails = await Promise.all(result.map(async (pokemon) => {
          const pokeUrl = await axios.get(pokemon.url);
          return pokeUrl.data;
        }));

        console.log("pass this?", pokemonDetails);
        setData(pokemonDetails);
        setFilterData(pokemonDetails);
      },
        (error) => {
          console.log(error);
        }
      );
  };

  // Handle search input to filter Pokémon
  const handleFilter = (value) => {
    const res = filterData.filter(result => result.name.toLowerCase().includes(value.toLowerCase()));
    setData(res);
  };

  // Handle Pokémon selection and navigate to Pokémon page
  const handleSelectPokemon = (pokeObj) => {
    navigate('/PokemonPage', { state: { pokemon: pokeObj } });
  };

  console.log("whats here?", data);

  // Fetch Pokémon data when the component mounts
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="App">
      {/* Search bar */}
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="Search Here"
            onChange={e => handleFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Page header */}
      <h1>PokeDex</h1>

      {/* Pokémon card grid */}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {data.map((pokeObj, index) => {
          console.log("im here", pokeObj);
          return (
            <div key={index} className="col-md-4">
              <div className="card" style={{ width: '18rem' }}>
                {/* Pokémon image */}
                <img
                  src={pokeObj.sprites.front_default}
                  alt={pokeObj.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5>{pokeObj.name}</h5>
                  {/* Pokémon types with colored badges */}
                  <p>
                    Type:{" "}
                    {pokeObj.types.map((typeObj, typeIndex) => (
                      <span
                        key={typeIndex}
                        className={`type type-${typeObj.type.name}`}
                      >
                        {typeObj.type.name}
                      </span>
                    ))}
                  </p>
                  {/* Button to select Pokémon */}
                  <button
                    onClick={() => handleSelectPokemon(pokeObj)}
                    className="btn btn-primary"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StartPage;
