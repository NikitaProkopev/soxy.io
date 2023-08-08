const sliderController = document.getElementById('slider-control');
let images = document.getElementById('images');

(function sliderWithController() {
    [...images.children].forEach((item, index) => {
        const controller = document.createElement('div');
        if (index === 0) {
            controller.className = 'active';
        }
        sliderController.appendChild(controller);
    })

    const controllerChildren = [...sliderController.children];


    if (sliderController) {

        controllerChildren.forEach((item) => {
            item.onclick = function (event) {

                controllerChildren.forEach(item => item.className = undefined);
                event.target.className = 'active';

                const activeIndex = controllerChildren.findIndex((item) => item.className === 'active');
                let translateXValue = (window.innerWidth - 32) * -activeIndex + 16 * -activeIndex;
                images.style.transform = `translate3d(${translateXValue}px, 0, -1px)`
            }
        })

    }
})();

(function sliderWithControllScrolling() {
    if (window.innerWidth < 800) {
        const firstSectionWrapper = document.getElementById('first-section-wrapper');
        firstSectionWrapper.ontouchstart = function (event) {
            images.style.transition = 'none';
            startScrollingX = event.touches[0].pageX;

            const values = images.style.transform.split(/\w+\(|\);?/);
            const transform = values[1].split(/,\s?/g).map(parseInt);
            startScrollPosition = transform[0];


            document.body.style.userSelect = 'none';
            document.body.ontouchmove = function (event) {
                let currentX = event.touches[0].pageX;
                images = document.getElementById('images');
                const currentTransformX = startScrollPosition + (currentX - startScrollingX);
                images.style.transform = `translate3d(${currentTransformX}px, 0, -1px)`;
            }

            document.body.ontouchend = document.body.onmouseup = function () {
                document.body.ontouchmove = undefined;
                document.body.ontouchend = undefined;
                document.body.style.userSelect = 'auto';
                images.style.transition = 'transform 0.5s';

                const values = images.style.transform.split(/\w+\(|\);?/);
                const transform = values[1].split(/,\s?/g).map(parseInt);
                endScrollPosition = transform[0];
                const scrollingPercentage = (startScrollPosition - endScrollPosition) / images.children[0].offsetWidth;
                const currentItem = -(startScrollPosition / (window.innerWidth - 16));
                if (Math.abs(scrollingPercentage) > 0.3) {
                    const isRightScrolling = scrollingPercentage < 0;
                    let nextItem = isRightScrolling ? currentItem - 1 :currentItem + 1;

                    nextItem = nextItem < 0 ? 0 : nextItem;
                    nextItem = nextItem >= images.children.length ? images.children.length - 1 : nextItem;

                    const translationX = (window.innerWidth - 32) * -nextItem + 16 * -nextItem;
                    images.style.transform = `translate3d(${translationX}px, 0, -1px)`;
                    [...sliderController.children].forEach(item => item.className = undefined);
                    sliderController.children[nextItem].className = 'active';
                } else {
                    const translationX = (window.innerWidth - 32) * -currentItem + 16 * -currentItem;
                    images.style.transform = `translate3d(${translationX}px, 0, -1px)`;
                }
                // (window.innerWidth - 32) * -activeIndex + 16 * -activeIndex
                startScrollingX = undefined;
            }
        }
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