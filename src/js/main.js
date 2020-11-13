import accordion from './blocks/accordion';
import Navigation from './blocks/navBar';

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
    'use strict';

    accordion('[data-trigger]');
    
    new Navigation().init();

});