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
