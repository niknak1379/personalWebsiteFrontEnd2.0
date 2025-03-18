window.onload = (event) => {
    let contactMeLink = document.getElementById('contactMeLink');
    //contactMeLink.addEventListener('click', openContactMe);
    if ('serviceWokrer' in navigator) {
         registerServiceWorker();
    }
   
    setTimeout(() => {
        document.documentElement.style.setProperty('--theme-change-timing', '0.5s');
    }, "1000")
    

    let footerLogoLink = document.querySelector('footer a.logo');
    let footerLogo = document.querySelector('footer img.logo');

    footerLogoLink.style.height = footerLogo.offsetHeight + 'px';

    let heroImgWrapper = document.querySelector('div.heroImgWrapper');
    let heroSVG = document.querySelector('img.heroSVG');
    if(heroImgWrapper != null){
      heroImgWrapper.style.width = `${heroSVG.clientWidth}` + 'px';
    }
    
};

window.addEventListener('resize' ,() => {
    let footerLogoLink = document.querySelector('footer a.logo');
    let footerLogo = document.querySelector('footer img.logo');

    footerLogoLink.style.height = footerLogo.offsetHeight + 'px';

    let heroImgWrapper = document.querySelector('div.heroImgWrapper');
    let heroSVG = document.querySelector('img.heroSVG');

    if(heroImgWrapper != null){
      heroImgWrapper.style.width = `${heroSVG.clientWidth}` + 'px';
    }
})

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("../serviceWorker.js", {
          scope: "/",
        });
        if (registration.installing) {
          //console.log("Service worker installing");
        } else if (registration.waiting) {
          //console.log("Service worker installed");
        } else if (registration.active) {
          //console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
};
  
  
  


/**
     * Scrolls the viewpoit to the top of the screen after triggered
     *
     * @function
     */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
}
