let inputSearch = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");
let mealContainer = document.querySelector(".recipebox");

  searchBtn.addEventListener("click", () => {
    const searchTerm = inputSearch.value.trim();
    if (searchTerm) {
      fetchMeals(searchTerm).then((meals) => {
        if (meals) {
          displayMeals(meals);
        } else {
          p = document.createElement("p");
          p.textContent = "No meals found.";
          p.style.color = "orangered";
          p.style.fontFamily = "Helvetica";
          p.style.fontSize = "30px";
          p.style.fontWeight = "bold";
          p.style.textAlign = "center";
          mealContainer.appendChild(p);

          console.log("No meals found.");
        }
      });
    } else {
      h2 = document.createElement("h2");
      h2.textContent = "Enter a meal Name";
      h2.style.color = "orangered";
      h2.style.fontFamily = "Helvetica";
      h2.style.fontSize = "30px";
      h2.style.fontWeight = "bold";
      h2.style.textAlign = "center";
      mealContainer.appendChild(h2);
      
    }
  });

const displayMeals = (meals) => {
  mealContainer.innerHTML = "";
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("recipe");
    mealDiv.innerHTML = `
        <img src=" ${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <button href="${meal.strYoutube}" target="_blank">View Recipe</button>
      `;
    mealContainer.appendChild(mealDiv);
  });
};

const fetchMeals = async (ingredient) => {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.meals);
    return data.meals;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
