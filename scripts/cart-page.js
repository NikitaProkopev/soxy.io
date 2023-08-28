const emptyCartTag = document.getElementById('empty-cart');
const cartWithItemsTag = document.getElementById('cart-with-items');
const cartTitle = document.getElementById('cart-title');
const cartItemsContainerTag = document.getElementById('cart-items-container');
const subtotalTag = document.getElementById('subtotal');
const totalTag = document.getElementById('total');

function getItemsAndGenerateHTML() {

    let cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItems && cartItems.length) {
        cartItems = cartItems.map(item => JSON.parse(item));
        emptyCartTag.style.display = 'none';
        cartWithItemsTag.style.display = 'block';
        cartTitle.style.marginBottom = '2.5em';
        cartItemsContainerTag.innerHTML = '';
        let generatedHTML = '';
        for(let i = 0; i < cartItems.length; i++) {
            generatedHTML += '<tr>' +
                `<td><img src="${cartItems[i].imgSrc}"/></td>`+
                '<td>' +
                    generateNameAndControlsHtml(cartItems[i].name, cartItems[i].manufacture, i) +
                '</td>' +
                `<td><p class="value">${cartItems[i].color}</p></td>` +
                `<td><p class="value">${cartItems[i].size}</p></td>` +
                '<td><p class="value count">' +
                    `<input class="count-input" maxlength="4"
                        style="width: ${0.6 * cartItems[i].count.toString().length}em" 
                        name="count-${i}" value="${cartItems[i].count}"/>` +
                '</p></td>' +
                `<td><p class="value price">\$ ${cartItems[i].price * cartItems[i].count}</p></td>` +
                '</tr>'
        }
        cartItemsContainerTag.innerHTML = generatedHTML;

        addEventListenersByClass('remove-item', removeControlEvent, 'onclick');
        addEventListenersByClass('move-to-whitelist', moveToWhitelistEvent, 'onclick');
        addEventListenersByClass('count-input', itemsCountChangeEvent, 'oninput')

        subtotalTag.innerText = totalTag.innerText = '$' +
            cartItems.reduce((accum, item) => accum += item.price * item.count, 0)

    } else {
        emptyCartTag.style.display = 'flex';
        cartWithItemsTag.style.display = 'none';
        cartTitle.style.marginBottom = '3.125em';
    }

}

function generateNameAndControlsHtml(name, manufacture, index) {
    return '<div>' +
            '<div class="second-column">' +
                '<div class="name-and-manufacture">' +
                `<p class="name">${name}</p>` +
                `<p class="manufacture">${manufacture}</p>` +
                '</div>' +
            '<div class="cart-item-control">'+
                `<div class="move-to-whitelist">` +
                    '<img src="assets/icons/heart.svg"/>' +
                    '<p>Move to  Whishlist</p>' +
                '</div>' +
                    `<div class="remove-item remove-${index}">` +
                        '<img src="assets/icons/remove.svg"/>' +
                        '<p>Remove item</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
}

function removeControlEvent(event) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItems && cartItems.length) {
        cartItems = cartItems.map(item => JSON.parse(item));
        const classList = event.target.classList.length
            ? event.target.classList
            : event.target.parentElement.classList;
        const index = +[...classList].find((item) => item.match(/remove-\d+/g))
            .replace('remove-', '');
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems.map(item => JSON.stringify(item))))
        getItemsAndGenerateHTML();
        countItemsInCartTag.children[0].innerText = cartItems.length;
    }
}

function moveToWhitelistEvent(event) {
    const element = event.target.classList.length ? event.target : event.target.parentElement;

    if (element.childNodes[0].src.includes('active')) {
        element.children[0].src = 'assets/icons/heart.svg';
        element.children[1].innerText = 'Move to  Whishlist';
    } else {
        element.children[0].src = 'assets/icons/heart-active.svg'
        element.children[1].innerText = 'Remove from  Whishlist';
    }
}

function itemsCountChangeEvent(event) {
    const value = +event.target.value;
    const index = +event.target.name.replace('count-', '');

    if (isNaN(value)) {
        event.target.value = event.target.value.slice(0, -1);
        return;
    }

    if (value < 0) {
        event.target.value = 0;
        getItemsAndGenerateHTML();
        return;
    }

    let cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItems && cartItems.length) {
        cartItems = cartItems.map(item => JSON.parse(item));
        cartItems[index].count = value;
        localStorage.setItem('cartItems', JSON.stringify(cartItems.map(item => JSON.stringify(item))))
        getItemsAndGenerateHTML();
        setTimeout(() => {
            const newGeneratedInput = cartItemsContainerTag.childNodes[index]
                .childNodes[4].childNodes[0].childNodes[0];
            newGeneratedInput.focus()
            newGeneratedInput.setSelectionRange(value.toString().length, value.toString().length);
        })
    }
}

function addEventListenersByClass(className, eventListener, eventName) {
    const tags = [...document.getElementsByClassName(className)];
    tags.forEach((item) => {
        item[eventName] = eventListener;
    });
}

getItemsAndGenerateHTML();

