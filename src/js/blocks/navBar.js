export default class Navigation {
    
    constructor() {
        this.navTrigger = document.querySelector('.nav__trigger');
        this.nav = document.querySelector('.nav');
        this.navItems = document.querySelectorAll('.nav__item a');
        this.main = document.querySelector('.wrapper-nav');
        this.transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
        this.isOpeningNav = false;
    }
    
    openNavigation() {
        this.navTrigger.classList.add('is-active');

        // body froze
        document.body.classList.add('is-froze');

        // Remove old inline styles
        if (this.main.style.removeProperty) {
            this.main.style.removeProperty('overflow');
            this.main.style.removeProperty('height');
        } else {
            this.main.style.removeAttribute('overflow');
            this.main.style.removeAttribute('height');
        }

        // .main active
        this.main.classList.add('is-active');
    }

    closeNavigation() {
        this.navTrigger.classList.remove('is-active');

        // .main inactive
        this.main.classList.remove('is-active');
        // this.main.addEventListener('transitionend', (e) => {
        //     if (e.propertyName == 'transform' && !this.navTrigger.classList.contains('is-active')) {
        //         // Reset overflow and height
        //         this.main.style.overflow = 'auto';
        //         this.main.style.height = 'auto';

        //         // body unfroze
        //         document.body.classList.remove('is-froze');
        //     }
        // });

        // no-csstransitions fallback
        if (document.documentElement.classList.contains('no-csstransitions')) {
            // .main inactive
            this.main.classList.remove('is-active');

            // body unfroze
            document.body.classList.remove('is-froze');
        }
    }

    // transitionPage(link) {
        
    //     this.main.classList.add('is-transition-out');
        
    //     this.main.addEventListener('transitionend', (e) => {
    //         if (e.propertyName == 'clip-path') {
    //             if (this.main.classList.contains('is-transition-in')) {
    //                 this.main.classList.remove('is-transition-in');
    //                 this.main.classList.remove('is-transition-out');
    //                 this.closeNavigation();
    //             }

    //             if (this.main.classList.contains('is-transition-out')) {
    //                 this.main.classList.remove('is-transition-out');

                    

    //                 setTimeout(() => {
    //                     this.main.classList.add('is-transition-in');
    //                     this.main.style.overflow = 'auto';
    //                 }, 500);
    //             }
    //         }
    //     });
    //     document.location.href = (link);
    // }

    init() {
        this.main.style.overflow = 'auto';

        //Handle scroll events
        window.addEventListener('scroll', (e) => {
            if (window.scrollY == 0 && this.isOpeningNav) {
                this.isOpeningNav = false;

                // Add a small delay
                setTimeout(() => {
                    this.openNavigation();
                }, 150);
            }
        });

        this.navTrigger.addEventListener('click', (e) => {
            e.preventDefault();

            if (!this.navTrigger.classList.contains('is-active')) {
                if (window.scrollY !== 0) {
                    // Scroll to top
                    window.scroll({ top: 0, left: 0, behavior: 'smooth' });

                    // Enable opening nav
                    this.isOpeningNav = true;
                } else {
                    this.openNavigation();
                }
            } else {
                this.closeNavigation();
            }
        });

        // Handle .nav__item click events
        this.navItems.forEach((navLink) => {
            navLink.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove is-active from all .nav__items
                this.navItems.forEach(function (el) {
                    el.classList.remove('is-active');
                });

                // // Ad is-active to clicked .nav__item
                // navLink.classList.add('is-active');

                // Transition the page
                let link = navLink.href;
                // this.transitionPage(link);

                this.main.classList.add('is-transition-out');
                this.main.addEventListener('transitionend', (e) => {
                    if (e.propertyName == 'clip-path') {
                        if (this.main.classList.contains('is-transition-in')) {
                            this.main.classList.remove('is-transition-in');
                            this.main.classList.remove('is-transition-out');
                            this.closeNavigation();
                        }
        
                        if (this.main.classList.contains('is-transition-out')) {
                            this.main.classList.remove('is-transition-out');
        
                            
        
                            setTimeout(() => {
                                this.main.classList.add('is-transition-in');
                                this.main.style.overflow = 'auto';
                            }, 500);
                        }
                    }
                });
                setTimeout(() => {
                    document.location.href = (link);
                }, 500);
                
            });
        });

        
    }
}