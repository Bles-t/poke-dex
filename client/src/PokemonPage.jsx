import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './PokemonPage.css';

function PokemonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const pokemon = location.state.pokemon;

  // Mapping Pokémon types to color classes
  const typeColors = {
    normal: "type-normal",
    fire: "type-fire",
    water: "type-water",
    grass: "type-grass",
    electric: "type-electric",
    ice: "type-ice",
    fighting: "type-fighting",
    poison: "type-poison",
    ground: "type-ground",
    flying: "type-flying",
    psychic: "type-psychic",
    bug: "type-bug",
    rock: "type-rock",
    ghost: "type-ghost",
    dark: "type-dark",
    dragon: "type-dragon",
    steel: "type-steel",
    fairy: "type-fairy",
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex-wrapper">
        <div className="pokedex-header">
          <h1 className="pokedex-title">Pokédex</h1>
        </div>

        <div className="pokedex-body">
          <div className="pokedex-screen">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <h2 className="pokemon-name">{pokemon.name.toUpperCase()}</h2>
            <div className="pokemon-types">
              {pokemon.types.map((typeObj, typeIndex) => (
                <span
                  key={typeIndex}
                  className={`pokemon-type ${typeColors[typeObj.type.name]}`}
                >
                  {typeObj.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="pokedex-stats">
            <p>Order: <span>{pokemon.order}</span></p>
            <p>HP: <span>{pokemon.stats[0].base_stat}</span></p>
            <p>Attack: <span>{pokemon.stats[1].base_stat}</span></p>
            <p>Defense: <span>{pokemon.stats[2].base_stat}</span></p>
            <p>Special Attack: <span>{pokemon.stats[3].base_stat}</span></p>
            <p>Special Defense: <span>{pokemon.stats[4].base_stat}</span></p>
            <p>Speed: <span>{pokemon.stats[5].base_stat}</span></p>
          </div>
        </div>

        <div className="pokedex-buttons">
          <button className="action-button red-button"></button>
          <button className="action-button blue-button"></button>
          <button className="action-button green-button"></button>
        </div>

        {/* Back Button */}
        <div className="back-button-container">
          <button
            className="btn btn-secondary back-button"
            onClick={() => navigate(-1)} // Navigate back to the previous page
          >
            Back to Pokédex
          </button>
        </div>
      </div>
    </div>
  );
}

export default PokemonPage;
