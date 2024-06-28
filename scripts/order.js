window.addEventListener("DOMContentLoaded", function() {
    let menu_items = []; // Initialize an empty array to store the menu items.
    loadData(menu_items); // Calls the loadData function to display the menu items on page load.

    // Fetches the menu data from the JSON file and displays the menu items on the page.
    function loadData(menu_items) {
    fetch("../data/menu.json")
    .then((answer) => answer.json())
    .then((data) => {
        console.log(data);
        menu_items = data;
        let menu_container = document.querySelector("#order-form-container");
        menu_container.innerHTML = "";
        
        for (key in menu_items) {
            let items = menu_items[key];
            let formatted_key = key.replace(/_/g, " ");
            menu_category_bar = document.createElement("div")
            menu_category_bar.className = "order-categories-bar"
            menu_category_bar.innerHTML = `<h2>${formatted_key}</h2>`

            menu_container.appendChild(menu_category_bar);

            items.forEach((item) => {
                formatted_item_name = item.name.replace(/ /g, "_");
                formatted_item_name = formatted_item_name.toLowerCase() + "_quantity";
                order_menu_output = document.createElement("div")
                order_menu_output.className = "order-item"
                order_menu_output.innerHTML = `
                <label for="${formatted_item_name}" class="order-item-text">
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                </label>
                <div class="order-item-qty">
                    <label for="${formatted_item_name}">Quantity:</label>
                    <div class="order-item-qty-input">
                        <input type="number" id="${formatted_item_name}" name="${formatted_item_name}" min="0" max="10">
                        <p id="price-text"> x $${item.price}</p>
                    </div>
                </div>`

                menu_container.appendChild(order_menu_output);

            });
}

// Clears the order form and displays the order summary when the form 'submit' button is pressed.
let order_form = document.querySelector("#order-form");
order_form.addEventListener("submit", function (e) {

    // Stores customer information in variables.
    let customer_name = document.querySelector("#name").value;
    let customer_email = document.querySelector("#email").value;
    let customer_phone = document.querySelector("#phone").value;

    // Initializes variables and assigns values to constants.
    let total = 0;
    let tax_amount = 0;
    let subtotal = 0;
    const tax_rate = 0.15;

    // Displays the order summary on the page.
    order_summary = document.querySelector("#order-summary");
    order_summary.innerHTML = `<section id="order-success-content">
            <h1 id="order-success-header">Order Success</h1>
            <div id="order-success-text">
            <p>
                Thank you for your order! We have received your order and will
                contact you shortly to confirm the details and provide you with an
                estimated pick-up time.
            </p>
            </div>
            <div id="customer-info">
            <h2 >Customer Information</h2>
            <p>Name: ${customer_name}</p>
            <p>Email: ${customer_email}</p>
            <p>Phone: ${customer_phone}</p>
        </div>
        </section>
  
        <div class="order-categories-bar">
            <h2>Order Summary</h2>
        </div>
        
        `;
    
    // Iterates through the menu items and calculates the total price of the order.
    for (category in menu_items) {

        menu_items[category].forEach((item) => {
            formatted_item_name = item.name.replace(/ /g, "_");
            formatted_item_name = formatted_item_name.toLowerCase() + "_quantity";
            let quantity = document.querySelector(`#${formatted_item_name}`).value;
            console.log(quantity);
            
            if (quantity > 0) {
                total += item.price * quantity;

                ordered_item = document.createElement("div")
                ordered_item.className = "ordered-item"
                ordered_item.innerHTML = `
                <h2>${item.name}</h2>
                <p>Quantity: ${quantity}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Subtotal: $${item.price * quantity}</p>`
                order_summary.appendChild(ordered_item);
            }
        });

    }

    // Calculates the tax amount and subtotal of the order.
    tax_amount = total * tax_rate;
    subtotal = total + tax_amount;

    // Displays the order total, tax amount, and subtotal on the page.
    order_summary.innerHTML += `
    <div class="separator-line"></div>

    <div id="order-total">
    <p>Order Total: $${total.toFixed(2)}</p>
    <p>Order Tax: $${tax_amount.toFixed(2)}</p>
    <p>Order Subtotal: $${subtotal.toFixed(2)}</p>
    </div>`;

    // Clears the order form part of the page.
    let order_page_display = document.querySelector("#order-form-display");
    order_page_display.innerHTML = "";

    // Prevents the form from submitting and refreshing the page.
    e.preventDefault();
});
})
    .catch((error) => {
        console.error("Error:", error);
    });
    }

});