const inputValueAppliedNameArray = [
    { inputValue: 'color-1', appliedName: 'Color 1' },
    { inputValue: 'color-2', appliedName: 'Color 2' },
    { inputValue: 'color-3', appliedName: 'Color 3' },
    { inputValue: 'color-4', appliedName: 'Color 4' },
    { inputValue: '24s-worldwide', appliedName: '24S Worldwide' },
    { inputValue: 'adidas', appliedName: 'Adidas' },
    { inputValue: 'bergdorf-goodman', appliedName: 'Bergdorf Goodman' },
    { inputValue: 'asos', appliedName: 'ASOS' },
    { inputValue: 'bloomingdales', appliedName: 'Bloomingdales' },
];
const filterForms = document.getElementsByClassName('filter-form');
const appliedFiltersContent =
    window.innerWidth > 800 ? document.getElementById('applied-filters-content')
        : document.getElementById('mobile-applied-filters-content');
const categoryProducts = document.getElementById('category-products');

function setCountProductColumns() {
    if (document.body.offsetWidth < 1020) {
        categoryProducts.style.gridTemplateColumns = 'repeat(2, 1fr)';
        return;
    }

    if (document.body.offsetWidth < 1340) {
        categoryProducts.style.gridTemplateColumns = 'repeat(3, 1fr)';
        return;
    }

    categoryProducts.style.gridTemplateColumns = 'repeat(4, 1fr)';
}

setCountProductColumns();


(function hideFilters() {
    let filterTitles = document.getElementsByClassName('filter-with-hiding');
    function addOrDeleteHidden (className) {

        return className.includes('hidden')
            ? className.replace(' hidden', '')
            : className + ' hidden';

    }
    for (let i = 0; i < filterTitles.length; i++) {
        filterTitles[i].onclick = function (event) {
            let target = event.target;
            target = event.target.tagName !== 'P' ? event.target.parentElement : target;

            let parentElement = target.parentElement;
            let filterGroupContent = parentElement.children[parentElement.children.length - 1];
            filterGroupContent.className = addOrDeleteHidden(filterGroupContent.className);
            target.className = addOrDeleteHidden(target.className);
            parentElement.className = addOrDeleteHidden(parentElement.className);

        };
    }
})();


(function selectAndRemoveCategoryFromForm() {

    for(let i = 0; i < filterForms.length; i++) {

        for(let j = 0; j < filterForms[i].length; j++) {
            const formInput = filterForms[i][j];
            formInput.onchange = (event) => {

                const appliedFiltersName = inputValueAppliedNameArray
                    .find(
                        (item) => item.inputValue === event.target.name
                    ).appliedName;
                if (event.target.checked) {

                    const findAppliedItem = [...appliedFiltersContent.children].find((item) => {
                        return item.className === event.target.name;
                    });

                    if (findAppliedItem) return;

                    const newAppliedFilter = document.createElement('div');
                    newAppliedFilter.className = event.target.name;
                    newAppliedFilter.innerHTML =  `<p>${appliedFiltersName}</p>` +
                        '<img src="./assets/icons/cross.svg" alt="cross">';
                    addEventToAppliedFilters(newAppliedFilter.children[1]);
                    appliedFiltersContent.appendChild(newAppliedFilter);

                    changeSelectedFiltersCount();

                } else {

                    const appliedFilterTag = [ ...appliedFiltersContent.children ].find(
                        (item) => { return item.className === event.target.name }
                    )

                    if (appliedFilterTag) {
                        appliedFilterTag.remove();
                    }

                    changeSelectedFiltersCount();

                }

    };}}
})();

(function removeCategoryFromAppliedFilters() {
    [...appliedFiltersContent.children].forEach((appliedCategory) => {
        addEventToAppliedFilters(appliedCategory.children[1]);
    })
})()

function addEventToAppliedFilters(appliedFilter) {
    appliedFilter.onclick = (event) => {
        const parentElement = event.target.parentElement

        for(let i = 0; i < filterForms.length; i++) {

            for(let j = 0; j < filterForms[i].length; j++) {
                const input = filterForms[i][j];
                if (input.name === parentElement.className) {
                    input.checked = false;
                    parentElement.remove();
                    changeSelectedFiltersCount();
                }
                if (i === filterForms.length - 1 && j === filterForms[i].length - 1
                    && input.name !== parentElement.className) {
                        parentElement.remove();
                    changeSelectedFiltersCount();
                }
            }
        }

    }
}

function changeSelectedFiltersCount() {
    if (window.innerWidth < 800) {
        document.getElementById('filters-count').innerText =
            appliedFiltersContent.children.length.toString();
    }
}

(function mobileFilters(){
    const mobileFiltersBlock = document.getElementById('mobile-filter');
    const filtersBlock = document.getElementById('categories-filter');
    const categoriesProduct = document.getElementById('categories-products');


    mobileFiltersBlock.onclick = function () {
        const footer = document.getElementById('footer');
        if (filtersBlock.classList.contains('closed')) {
            filtersBlock.classList.replace('closed', 'opened');
        } else {
            filtersBlock.classList.add('opened');
        }
    }

    document.getElementById('close-filters').onclick = function () {
        const footer = document.getElementById('footer');
        filtersBlock.classList.replace('opened', 'closed');
    }
})();

document.body.onresize = setCountProductColumns;