
async function fetchPokemonList() {
  try {
    const url = "http://localhost:3000/pokemons"; // Ensure this points to your server
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch Pokémon list from server");
    }

    const data = await res.json();
    const listElement = document.getElementById('pokemonList');
    listElement.innerHTML = ''; // Clear the list before appending new items

    // Create instances of PokemonClass for each Pokémon
    const pokemonList = data.map(pokemonData => new PokemonClass(
      pokemonData.name,
      pokemonData.image,
      pokemonData.type,
      pokemonData.weight,
      pokemonData.height
    ));

    // Create card elements for each Pokémon
    pokemonList.forEach(pokemon => {
      const card = document.createElement('div');
      card.className = 'card';

      const imgElemnt = document.createElement('img');
      imgElemnt.src = pokemon.image;
      imgElemnt.alt = `${pokemon.name} image`;

      const nameElem = document.createElement('h3');
      nameElem.textContent = `Name: ${pokemon.name}`;

      const typeElem = document.createElement('p');
      typeElem.textContent = `Type: ${pokemon.type}`;

      const weightElem = document.createElement('p');
      weightElem.textContent = `Weight: ${pokemon.weight}`;

      const heightElem = document.createElement('p');
      heightElem.textContent = `Height: ${pokemon.height}`;

      card.appendChild(imgElemnt);
      card.appendChild(nameElem);
      card.appendChild(typeElem);
      card.appendChild(weightElem);
      card.appendChild(heightElem);

      listElement.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.getElementById('fetchButton').addEventListener('click', fetchPokemonList);
