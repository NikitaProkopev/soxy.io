
const bodyResize = new ResizeObserver(debounceAddScroll);
let scrollingTag = [...document.getElementsByClassName('scrolling-content')];
let scrollingWrapper = [...document.getElementsByClassName('scrolling-section-wrapper')];
let addScrollTimeout;

addScroll();

function debounceAddScroll() {
    if (addScrollTimeout) {
        clearTimeout(addScrollTimeout);
    }
    addScrollTimeout = setTimeout(
        () => { addScroll() },
        500
    );
}
bodyResize.observe(document.body) ;

function addScroll() {

    scrollingTag = [...document.getElementsByClassName('scrolling-content')]
    scrollingWrapper = [...document.getElementsByClassName('scrolling-section-wrapper')]

    const setWrapperHeight = (index) => {
        scrollingWrapper[index].style.height = scrollingTag[index].offsetHeight + 40 + 'px';
    }

    let mobileScrollingTags = [...document.getElementsByClassName('mobile-scrolling-content')];
    let mobileScrollingWrappers = [...document.getElementsByClassName('mobile-scrolling-section-wrapper')];

    if (window.innerWidth < 800) {

        if (mobileScrollingTags && mobileScrollingTags.length
            && mobileScrollingWrappers && mobileScrollingWrappers.length) {

            scrollingTag.push(...mobileScrollingTags);
            scrollingWrapper.push(...mobileScrollingWrappers);
        }
    } else {
        mobileScrollingTags.forEach((item) => {
            item.style.display = null;
            item.style.gridTemplateColumns = null;
            item.style.width = null;
        });
        mobileScrollingWrappers.forEach((item) => {
            item.innerHTML = '';
        })
    }

    let startScrollingX = undefined;
    let startScrollPosition = undefined;

    for(let i = 0; i < scrollingWrapper.length; i++) {
        setWrapperHeight(i);
        const scrollingTagGap = +(getComputedStyle(scrollingTag[i]).gap.replace('px', ''));

        prepareScrollingTag(i, scrollingTagGap);

        scrollingWrapper[i].ontouchstart = scrollingWrapper[i].onmousedown = function (event) {
            const target = event.target;
            if(target.classList.contains('scrolling-switcher-control')
                || target.parentElement.classList.contains('scrolling-switcher-control')
                || target.classList.contains('scrolling-control-arrow')) {
                return;
            }

            startScrollingX = event.x ? event.x : event.touches[0].pageX;
            startScrollPosition = scrollingTag[i].scrollLeft;

            document.body.style.userSelect = 'none';
            document.body.ontouchmove = document.body.onmousemove = function (event) {
                let currentX = event.x ? event.x : event.touches[0].pageX;
                scrollingTag[i].scrollTo(startScrollPosition - (currentX - startScrollingX), 0);
            }

            document.body.ontouchend = document.body.onmouseup = function () {
                document.body.onmousemove = document.body.ontouchmove = undefined;
                const firstChildX = [...scrollingTag[i].children].filter(item => item.offsetWidth !== 0)[0].offsetLeft;
                const currentItem = getCurrentItem(i);

                let isScrollToNext =
                    Math.abs(currentItem.getBoundingClientRect().x - firstChildX)
                    / (currentItem.offsetWidth + scrollingTagGap)
                    >= 0.5;

                let scrollingPosition = scrollingTag[i].scrollLeft;

                const scrollEnd = isScrollToNext ? currentItem.nextElementSibling.offsetLeft - firstChildX
                    :currentItem.offsetLeft - firstChildX;

                addAnimation(scrollingPosition, scrollEnd, i);

                let elementIndex = [...scrollingTag[i].children].filter((children) => children.offsetWidth > 0).indexOf(currentItem);

                if (isScrollToNext) {
                    elementIndex++;
                }

                const switcherChildren = [...document.getElementById(`scrolling-switcher-${i}`).children];
                switcherChildren.forEach((children) => children.classList.remove('active'));

                switcherChildren[elementIndex].classList.add('active');


                startScrollingX = undefined;
                document.body.onmouseup = document.body.ontouchend = undefined;
                document.body.style.userSelect = 'auto';
            }
        }
    }
}

function addAnimation(scrollingPosition, scrollEnd, i) {

    let intervalsCount = 0;

    let animationInterval;

    const distance = scrollEnd - scrollingPosition;

    animationInterval = setInterval(() => {
        if (intervalsCount < 15) {

            let scrollTo = scrollingPosition += distance / 15;
            scrollingTag[i].scrollTo(scrollTo, 0);
            intervalsCount++;

        } else {

            clearInterval(animationInterval);
            animationInterval = undefined;
            intervalsCount = 0;

        }
    },12);
}

function prepareScrollingTag(index, gap) {

    const scrollingControl = document.createElement('div');
    scrollingControl.classList.add('scrolling-control');
    scrollingControl.innerHTML = `<div id="scrolling-control-left-${index}" class="scrolling-control-arrow"><</div>` +
        `<div id='scrolling-switcher-${index}' class="scrolling-switcher"></div>` +
        `<div id="scrolling-control-right-${index}" class="scrolling-control-arrow">></div>`;

    scrollingTag[index].style.width = null;
    scrollingWrapper[index].innerHTML = '';
    scrollingWrapper[index].appendChild(scrollingControl);

    const maxWidth = scrollingTag[index].offsetWidth;
    const childrens = [...scrollingTag[index].children].filter((children) => children.offsetWidth > 0);
    let elementsWidth = 0;
    let numberOfItem;
    for(let i = 0; i < childrens.length; i++) {
        const prevWidth = elementsWidth;
        elementsWidth += childrens[i].offsetWidth;
        if (i !== 0) {
            elementsWidth += gap;
        }
        if (elementsWidth > maxWidth) {
            numberOfItem = i - 1;
            elementsWidth = prevWidth;
            break;
        }
    }

    if (numberOfItem === undefined) {

        document.getElementById(`scrolling-control-left-${index}`).style.display = 'none';
        document.getElementById(`scrolling-control-right-${index}`).style.display = 'none';

    } else {

        document.getElementById(`scrolling-control-left-${index}`).onclick =
            () => { arrowButtons(true, index) };
        document.getElementById(`scrolling-control-right-${index}`).onclick =
            () => { arrowButtons(false, index) };

    }


    const maxChildrenWidth = childrens.reduce(
        (accum, item) => accum > item.offsetWidth ? accum : item.offsetWidth, 0
    );

    scrollingTag[index].style.width = elementsWidth + 'px';
    scrollingTag[index].style.display = 'grid';
    scrollingTag[index].style.gridTemplateColumns = `repeat(${childrens.length}, ${maxChildrenWidth}px)`;

    scrollingControl.style.width = elementsWidth + 80 + 'px';

    const switcher = document.getElementById(`scrolling-switcher-${index}`);

    for(let i = 0; i < childrens.length - numberOfItem; i++) {
        const switcherControl = document.createElement('div');
        switcherControl.classList.add('scrolling-switcher-control');
        switcherControl.appendChild(document.createElement('div'))
        if (i === 0) {
            switcherControl.classList.add('active');
        }
        switcherControl.onclick = (event) => {
            const firstChildX = childrens[0].offsetLeft;

            addAnimation(scrollingTag[index].scrollLeft, childrens[i].offsetLeft - firstChildX, index);
            [...switcher.children].forEach((children) => children.classList.remove('active'));

            if (event.target.classList.contains('scrolling-switcher-control')) {
                event.target.classList.add('active');
            } else {
                event.target.parentElement.classList.add('active');
            }
        };


        switcher.appendChild(switcherControl);
    }
}

function arrowButtons(isLeft, index) {

    const currentItem = getCurrentItem(index);
    let elementIndex = [...scrollingTag[index].children].filter((children) => children.offsetWidth > 0).indexOf(currentItem);
    const firstChildX = [...scrollingTag[index].children].filter(item => item.offsetWidth !== 0)[0].offsetLeft;
    let scrollEnd = -1;
    const switcherChildren = [...document.getElementById(`scrolling-switcher-${index}`).children];
    const switcherActive = switcherChildren.findIndex((item) => item.classList.contains('active'));
    if (!isLeft && switcherActive + 1 < switcherChildren.length) {
        scrollEnd = currentItem.nextElementSibling.offsetLeft - firstChildX;
    } else if (isLeft && elementIndex !== 0) {
        scrollEnd = currentItem.previousElementSibling.offsetLeft - firstChildX;
    } else {
        return;
    }

    addAnimation(scrollingTag[index].scrollLeft, scrollEnd , index);

    elementIndex += isLeft ? -1 : 1;

    switcherChildren.forEach((children) => children.classList.remove('active'));

    switcherChildren[elementIndex].classList.add('active');
}

function getCurrentItem(index) {
    const scrollingTagGap = +(getComputedStyle(scrollingTag[index]).gap.replace('px', ''));
    let widthSum = 0;

    const scrollPosition = scrollingTag[index].scrollLeft;

    return [...scrollingTag[index].children]
        .filter((children) => children.offsetWidth !== 0)
        .find((children, index) => {
            widthSum += children.offsetWidth;
            if ( index !== 0 ) widthSum += scrollingTagGap;
            if (scrollPosition < widthSum) {
                return children;
            }

        });

}
