import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '@fontsource/inter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './search.css';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Show 20 Pokémon per page
  const navigate = useNavigate();

  const fetchPokemon = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0")
      .then(async (response) => {
        const result = response.data.results;

        const pokemonDetails = await Promise.all(result.map(async (pokemon) => {
          const pokeUrl = await axios.get(pokemon.url);
          return pokeUrl.data;
        }));

        setData(pokemonDetails);
        setFilteredData(pokemonDetails);
      })
      .catch(error => console.log(error));
  };

  const handleFilter = (value) => {
    const res = data.filter(result =>
      result.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(res);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSelectPokemon = (pokeObj) => {
    navigate('/PokemonPage', { state: { pokemon: pokeObj } });
  };

  // Calculate the current page's Pokémon based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="App black-background">

      {/* Logout Button
      <div className="logout-button-container">
        <button onClick={handleLogout} className="btn btn-danger logout-button">
          Logout
        </button>
      </div> */}

      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="Search Here"
            onChange={e => handleFilter(e.target.value)}
          />
        </div>
      </div>

      <h1 className="pokedex-title">Pokédex</h1>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {currentItems.map((pokeObj, index) => {
          const primaryType = pokeObj.types[0].type.name; // Use primary type for tile color
          return (
            <div key={index} className="col-md-4">
              <div className={`card type-tile type-${primaryType}`} style={{ width: '18rem' }}>
                <img
                  src={pokeObj.sprites.front_default}
                  alt={pokeObj.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{pokeObj.name}</h5>
                  <p>
                    Type:{" "}
                    {pokeObj.types.map((typeObj, typeIndex) => (
                      <span
                        key={typeIndex}
                        className={`type-badge type-${typeObj.type.name}`}
                      >
                        {typeObj.type.name}
                      </span>
                    ))}
                  </p>
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

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={previousPage} className="btn btn-secondary" disabled={currentPage === 1}>
          Previous
        </button>
        <span className="page-info">Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</span>
        <button onClick={nextPage} className="btn btn-secondary" disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default StartPage;
