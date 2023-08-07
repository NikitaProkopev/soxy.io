
changeActive(document.getElementById('left-side-images'), true);
changeActive(document.getElementById('colors-variants'));
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