const restaurantGrid = document.querySelector(".restaurant-grid");
const input = document.querySelector("#input");
const filterBtn = document.querySelector(".filterBtn");
let donneDeLapi;

// tableau des restuarants fictifs
const restaurantsFictifs = [
    {
        cheminDeLimage: "restaurantPic.jpg",
        titre: "Restaurant By Orange 1",
        description: "Are you hungry? Then come at orange and get yourself well fed at our orange restaurants"
    },
    {
        cheminDeLimage: "restaurantPic.jpg",
        titre: "Restaurant By Orange 2",
        description: "Are you hungry? Then come at orange and get yourself well fed at our orange restaurants"
    },
    {
        cheminDeLimage: "restaurantPic.jpg",
        titre: "Restaurant By Orange 3",
        description: "Are you hungry? Then come at orange and get yourself well fed at our orange restaurants"
    },
    {
        cheminDeLimage: "restaurantPic.jpg",
        titre: "Restaurant By Orange 4",
        description: "Are you hungry? Then come at orange and get yourself well fed at our orange restaurants"
    },
    {
        cheminDeLimage: "restaurantPic.jpg",
        titre: "Restaurant By Orange 5",
        description: "Are you hungry? Then come at orange and get yourself well fed at our orange restaurants"
    },
    {
        cheminDeLimage: "restaurantPic.jpg",
        titre: "Restaurant By Orange 6",
        description: "Are you hungry? Then come at orange and get yourself well fed at our orange restaurants"
    }
];

const cartesRestaurant = (restaurants) => {
    const listesDesCartes = restaurants?.map((restaurant) => {
        return `
            <div>
                <img src=${restaurant.strMealThumb} alt="restaurant de paris">
                <div class="description-restaurant">
                    <h2>${restaurant.strMeal}</h2>
                    <p>${restaurant.strInstructions.slice(0, 100)}...</p>
                </div>
            </div>
        `
    });

    return listesDesCartes?.join(" ");
}

const fetchRestaurants = async () => {
    const data = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=beef");
    const listesDesRestaurants = await data.json();
    const nouvelListes = listesDesRestaurants.meals.length > 10 ? listesDesRestaurants.meals.splice(0, 10) : listesDesRestaurants;

    console.log(nouvelListes);
    donneDeLapi = nouvelListes;

    restaurantGrid.innerHTML = cartesRestaurant(donneDeLapi);
}

filterBtn.addEventListener("click", () => {
    const inputValue = input.value;

    if (!inputValue) {
        restaurantGrid.innerHTML = cartesRestaurant(donneDeLapi);
        return;
    }

    const nouvelDonne = donneDeLapi.filter((restaurant) => restaurant.strMeal.includes(inputValue));

    if (nouvelDonne.length === 0) {
        restaurantGrid.innerHTML = `<h4>Desolee pas de restaurants avec le nom ${inputValue}</h4>`
        return;
    }
    console.log(nouvelDonne);
    restaurantGrid.innerHTML = cartesRestaurant(nouvelDonne)
})

fetchRestaurants();