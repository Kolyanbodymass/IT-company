// Добавление класса с WEBP изображениями, если их поддерживает браузер
function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function() {
        callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}
testWebP(function(support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }
});

window.addEventListener('DOMContentLoaded', () => {

    // accordion
    const link = document.querySelector('.standards__link'),
          text = document.querySelector('.standards__desc-scan');

    link.addEventListener('click', (e) => {
        e.preventDefault();

        if (window.getComputedStyle(text).display == "none") {
            text.classList.add('animate__animated');
            text.classList.remove('animate__fadeOut');
            text.classList.add('animate__fadeIn');
            text.style.display = "block";
        } else {
            text.classList.remove('animate__fadeIn');
            text.classList.add('animate__fadeOut');
            text.style.display = "none";
        }
    });


});