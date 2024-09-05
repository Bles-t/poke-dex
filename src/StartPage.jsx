import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '@fontsource/inter';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './search.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function StartPage() {

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([])
  const navigate = useNavigate();

  const fetchPokemon = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20")
      .then(async (response) => {
        const result = response.data.results;

        const pokemonDetails = await Promise.all(result.map(async (pokemon) => {
          const pokeUrl = await axios.get(pokemon.url);
          return pokeUrl.data
        }))


        console.log("pass this?", pokemonDetails);
        setData(pokemonDetails)
        setFilterData(pokemonDetails)
      },
        (error) => {
          console.log(error);
        }
      );
  }

  const handleFilter = (value) => {
    const res = filterData.filter(result => result.name.toLowerCase().includes(value))
    setData(res);
  }

  const handleSelectPokemon = (pokeObj) => {
    navigate('/PokemonPage', { state: { pokemon: pokeObj } });
  };


  console.log("whats here?", data);
  useEffect(() => {
    fetchPokemon()
  }, [])




  return (
    <div className="App">

      <div className='wrapper'>
        <div className="search">
          <input type="text" placeholder="Search Here" onChange={e => handleFilter(e.target.value)} />
        </div>
      </div>

      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>

      <h1>PokeDex</h1>


      <div class="row row-cols-1 row-cols-md-2 g-4">
        {data.map((pokeObj, index) => {
 console.log("im here",pokeObj);
          return <div key={index} class="col-md-4">
            <div class="card" style={{ width: '18rem' }}>

              <img src={pokeObj.sprites.front_default} class="card-img-top"></img>
              <h5> {pokeObj.name} </h5>
              {/* i addded this because not every pokemon has two types. so i need to intrate throguh the array and show what are all the types are. */}
              <p> Type: {pokeObj.types.map((typeObj, typeIndex) => (
                <span key={typeIndex}> {typeObj.type.name}</span>
              ))}
              </p>
              {/* < Link to={{ pathname: "/PokemonPage", state: { pokemon: pokeObj } }} href="#" className="btn btn-primary"> Select
              </Link> */}

<button onClick={() => handleSelectPokemon(pokeObj)} className="btn btn-primary">
  Select
</button>

            </div>
          </div>

        })}
      </div>

    </div>
  );
}

export default StartPage;
