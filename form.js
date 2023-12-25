import { PizzerData } from "./PizzerData";
// Function to handle form submission
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
    PizzerData.push(newData);

    // Render UI dynamically with the updated data
    console.log(PizzerData);

    // Optional: Clear the form fields after submission
    document.getElementById("myForm").reset();
  };
  if (imageFile) {
    reader.readAsDataURL(imageFile); // Read image file as data URL
  }
};
// Attach event listener to the form for form submission
document.getElementById("myForm").addEventListener("submit", handleSubmit);
