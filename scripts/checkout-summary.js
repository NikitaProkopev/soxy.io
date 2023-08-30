const checkoutSummaryTag = document.getElementById('checkout-summary-content');
const subtotalTag = document.getElementById('subtotal');
const totalTag = document.getElementById( 'total');

let cartItemsArray = JSON.parse(localStorage.getItem('cartItems'));

if (cartItemsArray && cartItemsArray.length) {
    cartItemsArray = cartItemsArray.map((item) => JSON.parse(item));

    let generatedHTML = '';

    cartItemsArray.forEach((item) => {
        generatedHTML += '<div class="summary-item">' +
                `<img src="${item.imgSrc}" alt="item-image"/>` +
                '<div>' +
                    `<p class="name">${item.name}</p>` +
                    `<p>${item.manufacture}</p>` +
                    `<div class="item-parameters">
                        <p><span class="name">Color:</span><span class="value">${item.color}</span></p>
                        <p><span class="name">Size:</span><span class="value">${item.size}</span></p>
                        <p><span class="name">Qty:</span><span class="value">${item.count}</span></p>
                    </div>` +
                    `<p class="price">\$${item.price}</p>` +
                '</div>'+
            '</div>' +
            '<div class="summary-separator"></div>';
    });

    checkoutSummaryTag.innerHTML = generatedHTML;
    totalTag.innerText = subtotalTag.innerText = '$' + cartItemsArray.reduce((accum, item) => accum += item.count * item.price, 0);
}