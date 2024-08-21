require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000; // Use defined port or default to 3000

app.use(cors());

// Endpoint to fetch Pokémon data
app.get("/pokemons", async (req, res) => {
  try {
    // Fetching a list of Pokémon
    const apiRes = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=150');

    if (!apiRes.ok) {
      throw new Error(`HTTP error status: ${apiRes.status}`);
    }

    const data = await apiRes.json();

    // Fetch additional details for each Pokémon
    const pokemonPromises = data.results.map(async (pokemon) => {
      const pokemonRes = await fetch(pokemon.url);
      return pokemonRes.json();
    });

    // Wait for all Pokémon details to be fetched
    const pokemonDetails = await Promise.all(pokemonPromises);

    // Send response with Pokémon names and images
    const response = pokemonDetails.map(pokemon => ({
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      weight: pokemon.weight,
      height: pokemon.height,
      type: pokemon.types.map(t => t.type.name).join(', ') // Convert types to string
    }));

    res.json(response);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


