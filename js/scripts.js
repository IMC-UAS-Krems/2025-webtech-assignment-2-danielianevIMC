// Show cart page
document.getElementById("btn-cart").onclick = function() 
{
    document.getElementById("products-page").classList.add("d-none");
    document.getElementById("cart-page").classList.remove("d-none");
};

// Back to products
document.getElementById("btn-back").onclick = function() 
{
    document.getElementById("cart-page").classList.add("d-none");
    document.getElementById("products-page").classList.remove("d-none");
};


//How shopping cart works
// Youtube video that i found useful for my shopping cart - https://www.youtube.com/watch?v=YeFzkC2awTM

var cart = [];

var addButtons = document.getElementsByClassName("add-btn");

for (var i = 0; i < addButtons.length; i++) 
{
    addButtons[i].onclick = function() 
    {
        var name = this.getAttribute("data-name");
        var price = parseFloat(this.getAttribute("data-price"));
        var image = this.getAttribute("data-image");

        var item = {name : name, price : price, image : image};
        cart.push(item);
        updateCart();
    };
}


function updateCart() 
{
    var cartDiv = document.getElementById("cart-list");
    cartDiv.innerHTML = "";
    var total = 0;

    for (var i = 0; i < cart.length; i++) 
    {
        total = total + cart[i].price;
        cartDiv.innerHTML += 
            "<div class='card mb-2'>" +
                "<div class='row g-0 align-items-center'>" +
                    "<div class='col-3'>" +
                        "<img src='" + cart[i].image + "' class='img-fluid'>" +
                    "</div>" +
                    "<div class='col-6'>" +
                        "<div class='p-2'>" +
                            "<h5>" + cart[i].name + "</h5>" +
                            "<p>€" + cart[i].price.toFixed(2) + "</p>" +
                        "</div>" +
                    "</div>" +
                    "<div class='col-3 text-end p-2'>" +
                        "<button class='btn btn-danger btn-sm' onclick='removeItem(" + i + ")'>Remove</button>" +
                    "</div>" +
                "</div>" +
            "</div>";
    }

    document.getElementById("total-price").innerHTML = total.toFixed(2);
}


function removeItem(index) 
{
    cart.splice(index, 1);
    updateCart();
}


// Go to checkout page
// Youtube video that I found useful for my checkout and validation - https://www.youtube.com/watch?v=In0nB0ABaUk&t=46s

document.getElementById("checkout-btn").onclick = function () 
{
    if (cart.length === 0) 
    {
        alert("Your cart is empty.");
        return;
    }

    document.getElementById("cart-page").classList.add("d-none");
    document.getElementById("checkout-page").classList.remove("d-none");
};


document.getElementById("back-to-cart").addEventListener("click", function () 
{
    document.getElementById("checkout-page").classList.add("d-none");
    document.getElementById("cart-page").classList.remove("d-none");
});

document.getElementById("checkout-form").addEventListener("submit", function (e)
{
    e.preventDefault();
    var phone = document.getElementById("phone").value;
    var zip = document.getElementById("zip").value;

    if (isNaN(phone)) 
    {
        alert("Phone number must contain only numbers!");
        return;
    }

    if (zip.length > 6)
    {
        alert("ZIP code must be maximum 6 characters.");
        return;
    }

    document.getElementById("checkout-page").classList.add("d-none");
    document.getElementById("confirmation-page").classList.remove("d-none");

    showConfirmation();
});


//Youtube video that I found useful - https://www.youtube.com/watch?v=oTnd2lx5c-8&t=733s
function showConfirmation() 
{
    var summaryDiv = document.getElementById("confirmation-summary");
    summaryDiv.innerHTML = "";

    var total = 0;
    var discount = 0;

    for (var i = 0; i < cart.length; i++) 
    {
        total += cart[i].price;
        summaryDiv.innerHTML += "<p>" + cart[i].name + " - €" + cart[i].price.toFixed(2) + "</p>";
    }

    if (cart.length >= 3) 
    {
        discount = total * 0.1;
    }

    var finalTotal = total - discount;

    summaryDiv.innerHTML += "<p><strong>Discount:</strong> €" + discount.toFixed(2) + "</p>";
    document.getElementById("final-total").innerHTML = finalTotal.toFixed(2);

    cart = [];
    updateCart();
    document.getElementById("total-price").innerHTML = "0.00";

}

document.getElementById("back-to-products-final").onclick = function () 
{
    document.getElementById("confirmation-page").classList.add("d-none");
    document.getElementById("products-page").classList.remove("d-none");
};
