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

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

pokemonRepository.add({ name: "pikachu", height: 2 });
let pokemonArray = pokemonRepository.getAll();

function printArrayDetails(list) {
  //implementing foreach loop
  pokemonArray.forEach((pokemon) => {
    let text = pokemon.name + " (height: " + pokemon.height + ")";
    pokemon.height >= 7
      ? document.write(text + " - Wow, that's big!<br>")
      : document.write(text + "<br>");
  });
}

printArrayDetails(pokemonArray);
