let scrollingTag = [...document.getElementsByClassName('scrolling-content')];
let scrollingWrapper = [...document.getElementsByClassName('scrolling-section-wrapper')];

if (window.innerWidth < 800) {
    let mobileScrollingTags = [...document.getElementsByClassName('mobile-scrolling-content')];
    let mobileScrollingWrappers = [...document.getElementsByClassName('mobile-scrolling-section-wrapper')];

    if (mobileScrollingTags && mobileScrollingTags.length
        && mobileScrollingWrappers && mobileScrollingWrappers.length) {

        scrollingTag.push(...mobileScrollingTags);
        scrollingWrapper.push(...mobileScrollingWrappers);
    }
}


let startScrollingX = undefined;
let startScrollPosition = undefined;

if (scrollingTag) {
    if (scrollingTag[0]) {
        scrollingTag[0].scrollTo(window.innerWidth < 800 ? 276 : 156, 0);
    }
    if (scrollingTag[1]) {
        scrollingTag[1].scrollTo(window.innerWidth < 800 ? 200 : 90, 0);
    }
}

for(let i = 0; i < scrollingWrapper.length; i++) {

    scrollingWrapper[i].ontouchstart = scrollingWrapper[i].onmousedown = function (event) {
        startScrollingX = event.x ? event.x : event.touches[0].pageX;
        startScrollPosition = scrollingTag[i].scrollLeft;

        document.body.style.userSelect = 'none';
        document.body.ontouchmove = document.body.onmousemove = function (event) {
            let currentX = event.x ? event.x : event.touches[0].pageX;
            scrollingTag[i].scrollTo(startScrollPosition - (currentX - startScrollingX), 0);
        }

        document.body.ontouchend = document.body.onmouseup = function () {
            document.body.onmousemove = document.body.ontouchmove = undefined;
            startScrollingX = undefined;
            document.body.onmouseup = document.body.ontouchend = undefined;
            document.body.style.userSelect = 'auto';
        }
    }
}
