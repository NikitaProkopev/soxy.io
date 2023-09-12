const colorsVariants = document.getElementById('colors-variants');
const sectionsWithHiding = [...document.getElementsByClassName('section-with-hiding')];

changeActive(document.getElementById('left-side-images'), true);
changeActive(colorsVariants);
changeSectionsState();

function changeActive(imagesWrapper, isChangeMainImg = false) {
    const imagesArray = [...imagesWrapper.children];
    imagesArray.forEach((img) => {
        img.onclick = (event) => {
            imagesArray.forEach((img) => {
                img.className = "";
            })
            event.target.className = "active";
            if (isChangeMainImg) {
                document.getElementById('main-image').src = event.target.src;
            }
        };
    })
}

function changeSectionsState() {
    sectionsWithHiding.forEach((item) => {
        item.onclick = () => {
            if (item.classList.contains('closed')) {
                item.classList.replace('closed', 'opened');
            } else {
                item.classList.replace('opened', 'closed');
            }
        }
    })
}