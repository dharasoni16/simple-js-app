// Implementing IIFE in javascript
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

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
    listItem.classList.add("list-group-item");
    let button = document.createElement("button");
    let cardImg = document.createElement("img");

    button.innerText = pokemon.name;
    button.classList.add("pokemon-name-button", "btn", "btn-lg", "btn-warning");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#exampleModal");
    listItem.appendChild(button);

    //Function called for adding event to button when clicked
    onClick(button, pokemon);
    selectedElement.appendChild(listItem);

    //Function called to show image on card
    showImg(cardImg, pokemon);
    button.appendChild(cardImg);
  }

  // Function to display image on button
  function showImg(cardImg, pokemon) {
    loadDetails(pokemon).then(function () {
      cardImg.src = pokemon.CardImgUrl;
      cardImg.setAttribute("alt", "pokemonimage");
    });
  }

  // This function will add the event listener to button
  function onClick(button, pokemon) {
    // Adding eventlistner on button click event
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  // This function will execute on button click event
  function showDetails(pokemon) {
    let modalHeader = $(".modal-header");
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    // Clear existing content of model
    modalTitle.empty();
    modalBody.empty();

    // Creating elements in modal to display pokemon details
    loadDetails(pokemon).then(function () {
      let titleElement = $("<h1>" + pokemon.name + "</h1>");
      let img = $('<img class="pokemon-img">');
      img.attr("src", pokemon.imageUrl);
      img.attr("alt", "pokemonname");
      let heightElement = $(
        "<p class='list-group-item list-group-item-primary'>" +
          "Height : " +
          pokemon.height +
          "</p>"
      );
      let weightElement = $(
        "<p class='list-group-item list-group-item-primary'>" +
          "Weight : " +
          pokemon.weight +
          "</p>"
      );
      let typesElement = $(
        "<p class='list-group-item list-group-item-primary'>" +
          "Type : " +
          pokemon.types[0].type.name +
          "</p>"
      );

      modalTitle.append(titleElement);
      modalBody.append(img);
      modalBody.append(heightElement, weightElement, typesElement);
    });
  }

  // Load pokemon list from pokemon API
  function loadList() {
    showLoadingSpinner();
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingSpinner();
        return response.json();
      })
      .then(function (json) {
        hideLoadingSpinner();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingSpinner();
        console.error(e);
      });
  }

  // Load pokemon details from pokemon API
  function loadDetails(item) {
    showLoadingSpinner();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        hideLoadingSpinner();
        return response.json();
      })
      .then(function (details) {
        hideLoadingSpinner();
        // Now we add details to the item
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.CardImgUrl = details.sprites.front_default;
      })
      .catch(function (e) {
        hideLoadingSpinner();
        console.log(e);
      });
  }

  // Shows loading spinner before pokemonlist is loaded
  function showLoadingSpinner() {
    let spinner = document.getElementById("spinner");
    spinner.style.display = "block";
  }

  // Hide the spinner displayed before loading pokemonlist
  function hideLoadingSpinner() {
    let spinner = document.getElementById("spinner");
    spinner.style.display = "none";
  }

  // Search the pokemon from the pokemonlist
  document.querySelector("#search").addEventListener("input", function () {
    let searchpokemon = document.getElementById("search").value.toLowerCase();
    filterPokemon(searchpokemon);
  });

  function filterPokemon(searchpokemon) {
    let selectedElement = document.querySelector(".pokemon-list");
    selectedElement.innerHTML = "";

    let filteritem = pokemonList.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchpokemon);
    });

    filteritem.forEach((pokemon) => {
      addListItem(pokemon);
    });
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
