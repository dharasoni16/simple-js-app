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

//Declaring variables with empty string
let pokemon = "";
let text = "";

//looping through the Pokemon list arrays
for (let i = 0; i < pokemonList.length; i++) {
  //assigning pokemon variable to an instance of pokemon in pokemonList array
  pokemon = pokemonList[i];

  //assigning variable a string to print the list of pokemons on screen
  text = pokemon.name + " (height: " + pokemon.height + ")";

  //ternary condition to check pokemon having biggest height and printing the pokemon list on screen
  pokemon.height >= 7
    ? document.write(text + " - Wow, that's big!<br>")
    : document.write(text + "<br>");
}
