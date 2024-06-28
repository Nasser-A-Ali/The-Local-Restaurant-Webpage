window.addEventListener("DOMContentLoaded", function() {
    // Fetches the menu data from the menu.json file so that it is ready to be displayed on the menu page.
    fetch("../data/menu.json")
    .then((answer) => answer.json())
    .then((data) => {
        menu_items = data; // Stores the data from menu.json in a variable so it can be accessed by the getMenu() function.
    })
    .catch((error) => {
        console.error("Error:", error);
    });
});

// This function is called from the the_menu.html page when the user clicks on a menu category. It displays the appropriate
// items in that category.
function getMenu(category) {
    let menu_container = document.querySelector("#menu-container");
    menu_container.innerHTML = "";
    const items = menu_items[category]; // Accesses the items in the selected category from the menu_items variable.

    // Iterates through the items in the selected category and creates a div for each item, displaying them in order on the menu page.
    items.forEach((item) => {
        menu_output = document.createElement("div")
        menu_output.className = "menu-item"
        menu_output.innerHTML = `
        <div class="menu-item-img">
        <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="menu-item-text">
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p id="price-text">$${item.price}</p>
        </div>`
        menu_container.appendChild(menu_output);
    });
    
/* The following code was to append an "Order Now" button to redirect to the
"Order Now" page. I have decided to remove it for the sake of a cleaner menu UI. */

//      order_now_button = document.createElement("div")
//      order_now_button.innerHTML = `<button
//      onclick="window.location.href='../pages/order_now.html'"
//      id="menu-order-button"
//    >
//      Order Now
//    </button>`
//        menu_container.appendChild(order_now_button);

}