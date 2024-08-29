const renderOnePark = (park) => {
    const { name, location, description, established, area, rating } = park;

    const content = `
    <section class="park-display">
      <h2>${name}</h2>
      <div class="location-display">${location}</div>
      <div class="description-display">${description}</div>
      <button class="rate-button" title="Add to Favourites">&#9734;</button>
      <div class="stats">
        <div class="established-display stat">
          <h3>Established</h3>
          <div class="value">${established}</div>
        </div>
        <div class="area-display stat">
          <h3>Area</h3>
          <div class="value">${area}</div>
        </div>
        <div class="rating-display stat">
          <h3>Rating</h3>
          <div class="value">${rating}</div>
        </div>
      </div>
    </section>
    `;
    return content;
};

const render = () => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    const content = parks.map(renderOnePark).join("");
    main.innerHTML = content;
};

const submitHandler = (event) => {
  event.preventDefault();

  const form = document.querySelector("#park-form");
  const formData = new FormData(form);
 
  let hasErrors = false;

  formData.forEach((value, key) => {
    let errorId = `#${key}-error`;
    if (value.trim() === "") {
      document.querySelector(errorId).style.display = "block";
      hasErrors = true;
    } else {
      document.querySelector(errorId).style.display = "none";
    }
  });

  // if there are no errors
  if (!hasErrors) {

    const newPark = {
        name: formData.get("name"),
        location: formData.get("location"),
        description: formData.get("description"),
        established: formData.get("established"),
        area: formData.get("area"),
        rating: formData.get("rating"),
    };

    parks.push(newPark);
    render ();
  };
};

const favoriteButtonClickHandler = (event) => {
  if (event.target && event.target.nodeName == "BUTTON") {
    const park = event.target.parentNode;
    park.style.backgroundColor = "#c8e6c9";
  }
};

const sortByName = (parkA, parkB) => {
  const parkAName = parkA.name;
  const parkBName = parkB.name;
  if (parkAName < parkBName) {
    return -1;
  } else if (parkAName > parkBName) {
    return 1;
  } else {
    return 0;
  }
};

const sortByRating = (parkA, parkB) => {
  const parkARating = parkA.rating;
  const parkBRating = parkB.rating;
  
  return parkBRating - parkARating;
};


const nameSorterClickHandler = (event) => {
  event.preventDefault();

  parks.sort(sortByName);

  render();
};

const ratingSorterClickHandler = (event) => {
  event.preventDefault();

  parks.sort(sortByRating);

  render();
};


const main = () => {
  const nameSorter = document.querySelector("#name-sorter");
  nameSorter.addEventListener("click", nameSorterClickHandler);

  const ratingSorter = document.querySelector("#rating-sorter");
  ratingSorter.addEventListener("click", ratingSorterClickHandler);

  const main = document.querySelector("main");
  main.addEventListener("click", favoriteButtonClickHandler);

  const form = document.querySelector("#park-form");
  form.addEventListener("submit", submitHandler);

  render();
};

window.addEventListener("DOMContentLoaded", main);
