const burger = document.querySelector('.burger')
const menu = document.querySelector('.nav__menu')

burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active')
    menu.classList.toggle('nav__menu--active')

    //click on 'empty' space
    document.querySelector('.header__content').addEventListener('click', () => {
        burger.classList.remove('burger--active')
        menu.classList.remove('nav__menu--active')
    })
})

//slider
new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },

        658: {
            slidesPerView: 2
        },

        992: {
            slidesPerView: 1
        }
    }
})