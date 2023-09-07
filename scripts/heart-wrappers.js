
const categoryProducts = document.getElementById('category-products');

function setCountProductColumns() {

    if(document.body.offsetWidth < 990 && categoryProducts.classList.contains('product')) {
        categoryProducts.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (document.body.offsetWidth < 1080) {
        categoryProducts.style.gridTemplateColumns =
            `repeat(${categoryProducts.classList.contains('product') ? '3' : '2'}, 1fr)`;
    } else if (document.body.offsetWidth < 1340) {
        categoryProducts.style.gridTemplateColumns =
            `repeat(${categoryProducts.classList.contains('product') ? '4' : '3'}, 1fr)`;
    } else {
        categoryProducts.style.gridTemplateColumns =
            `repeat(${categoryProducts.classList.contains('product') ? '5' : '4'}, 1fr)`;
    }

    const children = categoryProducts.children;
    for( let i = 0; i < children.length; i++) {
        children[i].children[0].style.width = children[i].offsetWidth + 'px';
    }

}

setCountProductColumns();
document.body.onresize = setCountProductColumns;


(function heartClick() {
    let heartsWrappers = document.getElementsByClassName('heart-wrapper');
    for(let i = 0; i < heartsWrappers.length; i++) {

        heartsWrappers[i].children[0].onclick = function (event) {

            let target = event.target;
            let isActive = target.className === 'active'

            target.className = isActive ? '' : 'active';
            target.src = isActive ? './assets/icons/heart.svg' : './assets/icons/heart-active.svg';

        }
    }
})();