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

    let intervalsCount = 0;

    let animationInterval;

    scrollingWrapper[i].ontouchstart = scrollingWrapper[i].onmousedown = function (event) {

        if (animationInterval) {
            clearInterval(animationInterval);
            intervalsCount = 0;
            animationInterval = undefined;
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
            if (window.innerWidth < 800) {

                let scrollingPosition = scrollingTag[i].scrollLeft;
                let isLeftScrolling = startScrollPosition - scrollingPosition > 0;
                intervalsCount = 0;

                animationInterval = setInterval(() => {
                    if (intervalsCount < 20) {

                        let scrollTo = scrollingPosition += isLeftScrolling ? -10 + intervalsCount / 2 : 10 - intervalsCount / 2
                        scrollingTag[i].scrollTo(scrollTo, 0);
                        intervalsCount++;

                    } else {

                        clearInterval(animationInterval);
                        animationInterval = undefined;
                        intervalsCount = 0;
                        return;

                    }
                },20)
            }
            startScrollingX = undefined;
            document.body.onmouseup = document.body.ontouchend = undefined;
            document.body.style.userSelect = 'auto';
        }
    }
}
