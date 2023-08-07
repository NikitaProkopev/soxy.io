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
const appliedFiltersContent = document.getElementById('applied-filters-content');


(function hideFilters() {
    let filterTitles = document.getElementsByClassName('filter-with-hiding');
    function addOrDeleteHidden (className) {

        return className.includes('hidden')
            ? className.replace(' hidden', '')
            : className + ' hidden';

    }
    for (let i = 0; i < filterTitles.length; i++) {
        filterTitles[i].onclick = function (event) {

            let parentElement = event.target.parentElement;
            let filterGroupContent = parentElement.children[parentElement.children.length - 1];

            filterGroupContent.className = addOrDeleteHidden(filterGroupContent.className);
            event.target.className = addOrDeleteHidden(event.target.className);
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

                } else {

                    const appliedFilterTag = [ ...appliedFiltersContent.children ].find(
                        (item) => { return item.className === event.target.name }
                    )

                    if (appliedFilterTag) {
                        appliedFilterTag.remove();
                    }

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
                }
                if (i === filterForms.length - 1 && j === filterForms[i].length - 1
                    && input.name !== parentElement.className) {
                        parentElement.remove();
                }
            }
        }

    }
}