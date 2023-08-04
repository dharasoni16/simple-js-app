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
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Add a new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    let contentElement = document.createElement("p");
    let subContentElement = document.createElement("p");
    let img = document.createElement("img");
    img.classList.add("pokemon-img");

    loadDetails(pokemon).then(function () {
      titleElement.innerText = pokemon.name;
      contentElement.innerText = "Height: " + pokemon.height;
      subContentElement.innerText = "Type: " + pokemon.types[0].type.name;
      img.src = pokemon.imageUrl;
    });

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(subContentElement);
    modal.appendChild(img);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    // Since this can also triggered when clicking Inside the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
        item.imageUrl = details.sprites.other.dream_world.front_default;
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
