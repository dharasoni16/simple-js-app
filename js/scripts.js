// Implementing IIFE in javascript
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 7,
      types: ["grass", "poison"],
      category: "seed",
    },
    {
      name: "Charmander",
      height: 6,
      types: ["fire", "blaze"],
      category: "lizard",
    },
    {
      name: "Squirtle",
      height: 5,
      types: ["water", "torrent"],
      category: "tiny turtle",
    },
    {
      name: "Butterfree",
      height: 3,
      types: ["bug", "flying"],
      category: "butterfly",
    },
    {
      name: "Beedrill",
      height: 3,
      types: ["bug", "poison"],
      category: "poison bee",
    },
  ];

  // This function adds new pokemon to pokemon list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // This function returns pokemon list array
  function getAll() {
    return pokemonList;
  }

  // Return objects
  return {
    add: add,
    getAll: getAll,
  };
})();

// Adding new pokemon to list by calling add function
pokemonRepository.add({ name: "Pikachu", height: 2 });

// Assigining variable to Pokemon object returns by getall function
let pokemonArray = pokemonRepository.getAll();

function printArrayDetails(list) {
  //Implementing foreach loop
  pokemonArray.forEach((pokemon) => {
    let text = pokemon.name + " (height: " + pokemon.height + ")";
    pokemon.height >= 7
      ? document.write(text + " - Wow, that's big!<br>")
      : document.write(text + "<br>");
  });
}

printArrayDetails(pokemonArray);
