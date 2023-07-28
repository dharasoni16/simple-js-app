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

  // This function will add new pokemon to the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // This function will return whole pokemon list
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    // Using DOM functions to create and add HTML elements
    let selectedElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-name-button");
    listItem.appendChild(button);
    //Function called for adding event to button when clicked
    onclick(button, pokemon);
    selectedElement.appendChild(listItem);
  }

  // This function will add the event listener to button
  function onclick(button, pokemon) {
    // Adding eventlistner on button click event
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  // This function will execute on button click event
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  // IIFE returning objects
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.add({
  name: "Pikachu",
  height: 2,
  type: "electric",
  category: "cat",
});
let pokemonArray = pokemonRepository.getAll();

function printArrayDetails(list) {
  //Implementing foreach loop
  pokemonArray.forEach((pokemon) => {
    //Calling addListItem() with create an add HTML elements using DOM
    pokemonRepository.addListItem(pokemon);
  });
}

printArrayDetails(pokemonArray);
