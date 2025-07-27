const header = '../header.html';
const footer = '../footer.html';

// tai header va footer cua web
fetch(header)
    .then(res => res.text())
    .then(data => document.getElementById('header').innerHTML = data)

fetch(footer)
    .then(res => res.text())
    .then(data => document.getElementById('footer').innerHTML = data)

// ham load page
function loadpage(page) {
    fetch(page)
        .then(res => res.text())
        .then(data => document.getElementById('content').innerHTML = data)
}

window.onload = function() {
    loadpage('../pages/landing.html');
};