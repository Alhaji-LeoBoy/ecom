import { PizzerData } from "./PizzerData.js";

localStorage.setItem("Data", JSON.stringify(PizzerData));
const storedDataPizza = localStorage.getItem("Data");
let MainDataArray = JSON.parse(storedDataPizza);
// DOM Elements
const movieContainer = document.querySelector(".moviecontainer");
const selectItems = document.querySelector("#selectspecial");
const container = document.querySelector(".navbar-container");
const toggleBtn = document.querySelector("#menu");
const cartNumber = document.querySelector(".cart");

// Global Variables
let counter = 0;

// Toggle Navbar
toggleBtn.addEventListener("click", () => {
  container.classList.toggle("high");
});

// Sort Content Function
const sortContent = (x) => {
  if (selectItems.value === "sortprice") {
    return x.slice().sort((a, b) => b.price - a.price);
  } else if (selectItems.value === "sortAz") {
    return x.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectItems.value === "sortZa") {
    return x.slice().sort((a, b) => b.name.localeCompare(a.name));
  } else if (selectItems.value === "sortpricelow") {
    return x.slice().sort((a, b) => a.price - b.price);
  }
};

// Add To Cart Function
const addToCart = (e) => {
  const itemId = e.target.id;
  const arrayofId = JSON.parse(localStorage.getItem("id")) || [];
  arrayofId.push(itemId);
  localStorage.setItem("id", JSON.stringify([...new Set(arrayofId)]));
  counter++;
  cartNumber.textContent = counter;
};

// Render Product Function
const renderProduct = (xt) => {
  const sortedProjects = sortContent(xt);
  movieContainer.innerHTML = "";

  sortedProjects.forEach((data) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.id = data.id;

    const movieInnerDiv = document.createElement("div");
    movieInnerDiv.classList.add("movie1");

    const image = document.createElement("img");
    image.classList.add("ig");
    image.src = data.photoName;

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const title = document.createElement("h3");
    title.classList.add("t");
    title.textContent = data.name;

    const ingredientsPara = document.createElement("p");
    ingredientsPara.textContent = data.ingredients;

    const pricePara = document.createElement("p");
    pricePara.classList.add("px");
    pricePara.textContent = `$ ${data.price}`;

    const addtoCartDiv = document.createElement("div");
    addtoCartDiv.classList.add("addtoCart");

    const availabilitySpan = document.createElement("span");
    availabilitySpan.textContent = data.soldOut
      ? "Finished"
      : "Still Available";

    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("btnCart");
    addToCartBtn.id = data.id;
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.addEventListener("click", addToCart);

    addtoCartDiv.appendChild(availabilitySpan);
    addtoCartDiv.appendChild(addToCartBtn);

    infoDiv.appendChild(title);
    infoDiv.appendChild(ingredientsPara);
    infoDiv.appendChild(pricePara);

    movieInnerDiv.appendChild(image);
    movieInnerDiv.appendChild(infoDiv);
    movieInnerDiv.appendChild(addtoCartDiv);

    movieDiv.appendChild(movieInnerDiv);

    movieContainer.appendChild(movieDiv);
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const imageFile = document.getElementById("myFile").files[0];
  const ingredients = document.getElementById("Ingridents").value;
  const price = document.getElementById("price").value;

  const reader = new FileReader();
  reader.onload = (event) => {
    const imageUrl = event.target.result;
    // Create an object with the form data
    const newData = {
      id: Date.now(), // You might use a better method to generate IDs
      name: name,
      ingredients: ingredients,
      price: Number(price),
      photoName: imageUrl, // Convert to a number if required
      soldOut: false,
      // Add other properties as needed
    };

    // Push the new data to the workArrayAterfilter
    MainDataArray.push(newData);
    //let array = PizzerData;
    // Render UI dynamically with the updated data

    // console.log(PizzerData);
    renderProduct(MainDataArray);
    //localStorage.setItem("Data", JSON.stringify(MainDataArray));
    // Optional: Clear the form fields after submission
    document.getElementById("myForm").reset();
  };
  if (imageFile) {
    reader.readAsDataURL(imageFile); // Read image file as data URL
  }
};

let quote = document.querySelector(".quote");

function fetchData() {
  fetch("https://excuser-three.vercel.app/v1/excuse/developers/") // Replace 'https://api.example.com/data' with the API endpoint URL
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Process the fetched data
      data.map((data) => {
        quote.textContent = data.excuse;
      });
      // Perform operations or render UI with the retrieved data
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      // Handle errors or display an error message
    });
}

// Call the fetchData function to initiate the fetch operation
// setInterval(() => {
//   fetchData();
// }, 2000);

// Attach event listener to the form for form submission
document.getElementById("myForm").addEventListener("submit", handleSubmit);
// Event Listener for Page Load
// selectItems.addEventListener("change", renderProduct(PizzerData));
document.addEventListener("DOMContentLoaded", () => {
  renderProduct(MainDataArray);
  selectItems.addEventListener("change", function () {
    renderProduct(MainDataArray);
  });
  setInterval(() => {
    fetchData();
  }, 5000);
});
