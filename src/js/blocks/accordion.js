const accordion = (trigger) => {
    // const link = document.querySelector(trigger),
    //       text = link.previousElementSibling;

    // link.addEventListener('click', (e) => {
    //     e.preventDefault();

    //     text.classList.toggle('active');
    //     const paddings = 40;

    //     if (text.classList.contains('active')) {
    //         text.style.maxHeight = text.scrollHeight + paddings + "px";
    //     } else {
    //         text.style.maxHeight = "0px";
    //     }
    // });




    const btns = document.querySelectorAll(trigger);

    btns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // if (!this.classList.contains('active-style')) {
            //     btns.forEach(btn => {
            //         btn.classList.remove('active-style');
            //         btn.nextElementSibling.classList.remove('active-content');
            //         btn.nextElementSibling.style.maxHeight = '0px';
            //     });
            // }
            const text = this.previousElementSibling;


            text.classList.toggle('active');

            if (text.classList.contains('active')) {
                text.style.maxHeight = text.scrollHeight + 40 + "px";
            } else {
                text.style.maxHeight = '0px';
            }
        });
    });
}

export default accordion;