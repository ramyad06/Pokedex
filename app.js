document.addEventListener("DOMContentLoaded", () => {
  const P = new Pokedex.Pokedex();

  async function getPokemon() {
      try {
          const randomPokemonId = Math.floor(Math.random() * 898) + 1;

          const pokemon = await P.getPokemonByName(randomPokemonId.toString());

          updateScreen(pokemon);
      } catch (error) {
          console.error("Error fetching Pokémon:", error);
          document.querySelector("#pokemon-info").textContent = "Failed to fetch Pokémon. Try again!";
      }
  }

  function updateScreen(pokemon) {
      const screen = document.querySelector("#pokemon-info");
      const pokemonImage = document.getElementById("pokemon-image");

      if (!pokemonImage) {
          console.error("Error: Element with id 'pokemon-image' not found!");
          return;
      }
    const imageUrl = pokemon.sprites.front_default || pokemon.sprites.other['official-artwork'].front_default;

      if (imageUrl) {
          pokemonImage.src = imageUrl;
          pokemonImage.alt = pokemon.name;
          pokemonImage.style.display = "block";
      } else {
          pokemonImage.style.display = "none"; 
      }

      screen.innerHTML = `
          <h2>${pokemon.name.toUpperCase()}</h2>
          <p>Height: ${pokemon.height / 10}m</p>
          <p>Weight: ${pokemon.weight / 10}kg</p>
      `;
  }

document.querySelector(".button").addEventListener("click", getPokemon);
});
