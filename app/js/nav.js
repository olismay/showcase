var navMain = document.querySelector('.nav__list');
var button = document.querySelector('.nav__toggle');


button.addEventListener('click', (e) => {
  
  if (navMain.classList.contains('nav__list--closed')) {
    navMain.classList.remove('nav__list--closed');
    navMain.classList.add('nav__list--opened');     
  }
    else {
      navMain.classList.add('nav__list--closed');
      navMain.classList.remove('nav__list--opened'); 
    }
});

const toggleMenu = () => {
  
}



//document.addEventListener('click', (e) => {
//     const target = e.target;
//     const navMainOpen = target == navMain || navMain.contains(target);
//     const buttonMenu = target == button;
//     const navMainActive = navMain.classList.contains('nav__list--opened');

//     if(!navMainOpen && !buttonMenu && !navMainActive) {
//        toggleMenu();
//     }
//     console.log('lalalla');
// });