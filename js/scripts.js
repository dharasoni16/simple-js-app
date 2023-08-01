// Implementing IIFE in javascript
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    let img = document.createElement("img");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-name-button");
    listItem.appendChild(button);
    button.appendChild(img);
    //Function called for adding event to button when clicked
    onclick(button, pokemon);
    selectedElement.appendChild(listItem);
    showimg(img, pokemon);
  }

  // Display pokemon image
  function showimg(img, pokemon) {
    loadDetails(pokemon).then(function () {
      img.src = pokemon.imageUrl;
    });
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
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // Load pokemon list from pokemon API
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  // Load pokemon details from pokemon API
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        // Now we add details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.log(e);
      });
  }

  // Shows loading message before pokemonlist is loaded
  function showLoadingMessage() {
    let message = document.getElementById("alert");
    message.style.display = "block";
  }

  // Hide the loading message displayed before loading pokemonlist
  function hideLoadingMessage() {
    let message = document.getElementById("alert");
    message.style.display = "none";
  }

  // IIFE returning objects
  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
