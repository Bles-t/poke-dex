import React from "react";
import { useLocation } from "react-router-dom";
import './PokemonPage.css';

function PokemonPage() {
  const location = useLocation();
  const pokemon = location.state.pokemon;

  console.log("Pokemon Data:", pokemon);

  return (
    <div className="pokedex-container">
      <div className="pokedex-screen">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
        <h2 className="pokemon-name">{pokemon.name.toUpperCase()}</h2>
        <div className="pokemon-stats">
          <p>Order: <span>{pokemon.order}</span></p>
          <p>HP: <span>{pokemon.stats[0].base_stat}</span></p>
          <p>Attack: <span>{pokemon.stats[1].base_stat}</span></p>
          <p>Defense: <span>{pokemon.stats[2].base_stat}</span></p>
          <p>Special Attack: <span>{pokemon.stats[3].base_stat}</span></p>
          <p>Special Defense: <span>{pokemon.stats[4].base_stat}</span></p>
          <p>Speed: <span>{pokemon.stats[5].base_stat}</span></p>
        </div>
      </div>
    </div>
  );
}

export default PokemonPage;
