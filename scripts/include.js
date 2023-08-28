(() => {
    const includes = document.getElementsByTagName('include');
    [].forEach.call(includes, i => {
        let filePath = i.getAttribute('src');
        fetch(filePath).then(file => {
            file.text().then(content => {
                i.insertAdjacentHTML('afterend', content);
                i.remove();
            });
        });
        if (filePath.includes('header.html')) {
            setTimeout(() => {
                const cartScript = document.createElement("script");
                cartScript.src = './scripts/cart.js';
                document.body.appendChild(cartScript);
            }, 100)
        }
    });
})();