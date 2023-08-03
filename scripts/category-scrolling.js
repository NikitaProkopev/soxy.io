let scrollingTag = document.getElementsByClassName('scrolling-content');
let scrollingWrapper = document.getElementsByClassName('scrolling-section-wrapper')
let startScrollingX = undefined;
let startScrollPosition = undefined;

if (scrollingTag) {
    if (scrollingTag[0]) {
        scrollingTag[0].scrollTo(156, 0);
    }
    if (scrollingTag[1]) {
        scrollingTag[1].scrollTo(90, 0);
    }
}

for(let i = 0; i < scrollingWrapper.length; i++) {

    scrollingWrapper[i].onmousedown = function (event) {

        startScrollingX = event.x;
        startScrollPosition = scrollingTag[i].scrollLeft;
        document.body.style.userSelect = 'none';

        document.body.onmousemove = function (event) {
            scrollingTag[i].scrollTo(startScrollPosition - (event.x - startScrollingX), 0);
        }

        document.body.onmouseup = function () {
            document.body.onmousemove = undefined;
            startScrollingX = undefined;
            document.body.onmouseup = undefined;
            document.body.style.userSelect = 'auto';
        }
    }
}
