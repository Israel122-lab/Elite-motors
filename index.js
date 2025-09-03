const cartIcon = document.getElementById('cart-icon');
const cart = document.querySelector('.cart-container');
const closeCart = document.getElementById('cart-close');

cartIcon.addEventListener('click', () => {
    cart.classList.add('active'); //This Shows the cart
});

closeCart.addEventListener('click', () => {
    cart.classList.remove('active'); // This Hides the cart
});


const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});


const cartContent = document.querySelector(".cart-content")
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector("p").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle){
            alert("This item already exist in the cart");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

   cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
    const numberElement = cartBox.querySelector(".number");
    const decrementButton = cartBox.querySelector("#decrement");
    let quantity = parseInt(numberElement.textContent);

    if (event.target.id === "decrement" && quantity > 1) {
        quantity--;
        if (quantity === 1) {
            decrementButton.style.color = '#999';
        }
    } else if (event.target.id === "increment") {
        quantity++;
        decrementButton.style.color = '#333';
    }

    numberElement.textContent = quantity;
    updateTotalPrice();
}); 
   updateCartCount(1);

    updateTotalPrice();
};


const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        const quantity = parseInt (quantityElement.textContent);
        total += price * quantity;
    });
    totalPriceElement.textContent = `$${total}`
};


let cartItemCount = 0;
const updateCartCount = change => {
    const CartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        CartItemCountBadge.style.visibility = "visible";
        CartItemCountBadge.textContent = cartItemCount;
    }  else {
        CartItemCountBadge.style.visibility = "hidden";
        CartItemCountBadge.textContent = "";
    }
};


const buyNowButoon = document.querySelector(".btn-buy");
buyNowButoon.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("your cart is empty. kindly add items before buying");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Thank you for your purchase");
});
