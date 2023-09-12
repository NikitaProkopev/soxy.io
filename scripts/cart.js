const navigationBagTag = document.getElementById('navigation-bag');
const cartContainerTag = document.getElementById('cart-container');
const cartItemsTag = document.getElementById('cart-items');
const cartItemsCountTag = document.getElementById('cart-items-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartBackground = document.getElementById('cart-background');
const countItemsInCartTag = document.getElementById('count-items-in-cart');

const defaultValues = [
    JSON.stringify({
        name: 'Vibi Venezia slip-on loafers',
        manufacture: 'Leva 105 Leather',
        color: 'Blue',
        size: 'XS',
        count: 1,
        price: 825,
        imgSrc: './assets/images/category-product-13.png'
    }),
    JSON.stringify({
        name: 'Vibi Venezia slip-on loafers',
        manufacture: 'Leva 105 Leather',
        color: 'Blue',
        size: 'XS',
        count: 1,
        price: 825,
        imgSrc: './assets/images/category-product-2.png'
    })
]

if(!localStorage.getItem('cartItems')) {
    localStorage.setItem('cartItems', JSON.stringify(defaultValues));
}
let cartItems = JSON.parse(localStorage.getItem('cartItems'));

if (cartItems && cartItems.length) {
    countItemsInCartTag.children[0].innerText = cartItems.length;
} else {
    countItemsInCartTag.style.display = 'none';
}


navigationBagTag.onclick = () => {

    if (cartContainerTag.classList.contains('closed')) {

        let cartItems = JSON.parse(localStorage.getItem('cartItems'));

        if (cartItems && cartItems.length) {
            cartItems = cartItems.map(item => JSON.parse(item));
            cartItemsTag.innerHTML = '';
            let generatedCartItemsHTML = '';

            for(let i = 0; i < cartItems.length; i++){``
                generatedCartItemsHTML += '<div class="separator"></div>' +
                    '<div>' +
                        `<img src="${cartItems[i].imgSrc}">` +
                        '<div>' +
                            `<p class="name">${cartItems[i].name}</p>` +
                            `<p class="manufacture">${cartItems[i].manufacture}</p>` +
                            '<div class="parameters">' +
                                `<p>Color: <span>${cartItems[i].color}</span></p>` +
                                `<p>Size: <span>${cartItems[i].size}</span></p>` +
                                `<p>Qty: <span>${cartItems[i].count}</span></p>` +
                            '</div>' +
                            `<p class="price">$ ${cartItems[i].price}</p>` +
                        '</div>' +
                    '</div>';
            }
            generatedCartItemsHTML += '<div class="without-mb separator"></div>';
            cartItemsTag.innerHTML = generatedCartItemsHTML;
            cartItemsCountTag.innerText = `(${cartItems.length})`;
            cartTotalPrice.innerText = `\$${cartItems.reduce((accum, item) => accum += item.price * item.count, 0)}`
        } else {
            cartItemsCountTag.innerText = '';
        }

        cartBackground.style.height = document.body.offsetHeight + 'px';
        cartBackground.style.display = 'block';
        cartContainerTag.classList.replace('closed', 'opened');

        return;
    }

    cartBackground.style.display = 'none';
    cartContainerTag.classList.replace('opened', 'closed');

};

cartBackground.onclick = function () {

    cartBackground.style.display = 'none';
    cartContainerTag.classList.replace('opened', 'closed');

}