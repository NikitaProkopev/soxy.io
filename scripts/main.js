(function sliderWithController() {
    const sliderController = document.getElementById('slider-control');
    const controllerChildren = [...sliderController.children];
    const images = document.getElementById('images');

    if (sliderController) {

        controllerChildren.forEach((item) => {
            item.onclick = function (event) {

                controllerChildren.forEach(item => item.className = undefined);
                event.target.className = 'active';

                const activeIndex = controllerChildren.findIndex((item) => item.className === 'active')
                images.style.transform = `translateX(calc( (100vw - 32px) * ${-activeIndex} + 16px * ${-activeIndex}))`
            }
        })

    }
})();

(function loadMoreTrandingItems() {
    const loadButton = document.getElementById('eighth-section-load-button');
    const eightSection = document.getElementById('eight-section');

    if (loadButton && eightSection) {
        loadButton.onclick = function () {
            if (eightSection.classList.contains('opened')) {
                eightSection.style.maxHeight = '504px';
                eightSection.classList.remove('opened');
            } else {
                eightSection.style.maxHeight = eightSection.scrollHeight + 'px';
                eightSection.classList.add('opened');
            }
        }
    }
})()