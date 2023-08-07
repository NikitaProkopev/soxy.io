
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