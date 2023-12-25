// DOM elements

const storedDataPizza = localStorage.getItem("Data");
let MainDataArray = JSON.parse(storedDataPizza);

const Togglebtn = document.querySelector("#menu");
const container = document.querySelector(".navbar-container");
let rootCard = document.querySelector(".wrapper");
let totalAmount = document.querySelector(".total");
let dateS = document.querySelector(".data");
let timeY = document.querySelector(".time");
const cartNumber = document.querySelector(".cart");

// Global Variables
let counter = 0;

// Global variables
let finaltotal = 0;
const Datet = new Date();
dateS.textContent = Datet.toDateString();
let qty = 1;

// Utility functions
const utils = () => {
  Togglebtn.addEventListener("click", function () {
    container.classList.toggle("high");
  });

  document.querySelector(".clear").addEventListener("click", () => {
    rootCard.innerHTML = "";
    localStorage.clear();
  });
};

function filterObjectsByIds(arrayOfObjects, idsToFilter) {
  return arrayOfObjects.filter((obj) => idsToFilter.includes(obj.id));
}

function filterObjectsByIdsTotal(arrayOfObjects, idsToFilter) {
  let finalArray = filterObjectsByIds(arrayOfObjects, idsToFilter);
  let total = finalArray.map((data) => data.price);
  for (let i = 0; i < total.length; i++) {
    finaltotal += total[i];
  }
  totalAmount.textContent = `$ ${finaltotal}`;
}

// Data retrieval and manipulation
const arrayofIds = localStorage.getItem("id");
const cartIdArray = JSON.parse(arrayofIds) || [];
let arrayOfNumbers = cartIdArray.map((str) => parseInt(str, 10));
counter = arrayOfNumbers.length;
cartNumber.textContent = counter;
let copiPizzaData = MainDataArray;
let workArrayAterfilter = filterObjectsByIds(copiPizzaData, arrayOfNumbers);

// Rendering UI
const renderUI = (xArray) => {
  rootCard.innerHTML = "";

  xArray.forEach((data) => {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    const image = document.createElement("img");
    image.src = data.photoName;
    image.width = "300";

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("grid-item");

    const heading = document.createElement("h1");
    heading.textContent = data.name;

    const ingredients = document.createElement("p");
    ingredients.classList.add("ing");
    ingredients.textContent = data.ingredients;

    const price = document.createElement("h1");
    price.classList.add("h1price");
    price.textContent = `Price $ ${data.price}`;

    const quantity = document.createElement("p");
    quantity.innerHTML = `
      <button class="same sub">-</button> Qty <span>1<span><button class="same add_">+</button>
      <button class="dlt" id=${data.id}>Delete</button>
    `;
    // quantity.querySelector(".dlt").onclick = (e) => {
    //   let itemsArray = arrayOfNumbers;
    //   const itemIdToDelete = Number(e.target.id);
    //   // console.log(itemIdToDelete);
    //   const indexToDelete = itemsArray.findIndex(
    //     (item) => item === itemIdToDelete
    //   );
    //   //console.log(indexToDelete);
    //   if (indexToDelete !== -1) {
    //     itemsArray.splice(indexToDelete, 1);
    //     localStorage.setItem("id", JSON.stringify(itemsArray));
    //   }

    //   renderUI(workArrayAterfilter);
    // };
    quantity.querySelector(".dlt").onclick = (e) => {
      const itemIdToDelete = Number(e.target.id);
      const updatedItems = xArray.filter((item) => item.id !== itemIdToDelete);
      xArray = updatedItems;

      // Update localStorage with the modified array
      localStorage.setItem(
        "id",
        JSON.stringify(updatedItems.map((item) => item.id))
      );

      // Re-render UI based on the updated data
      renderUI(updatedItems);
    };
    itemDetails.appendChild(heading);
    itemDetails.appendChild(ingredients);
    itemDetails.appendChild(price);
    itemDetails.appendChild(quantity);

    gridContainer.appendChild(image);
    gridContainer.appendChild(itemDetails);

    rootCard.appendChild(gridContainer);
  });
};

// Event listener on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    const currentTime = new Date();
    timeY.textContent = currentTime.toLocaleTimeString();
  }, 100);
  utils();
  renderUI(workArrayAterfilter);
  filterObjectsByIdsTotal(copiPizzaData, arrayOfNumbers);
});
