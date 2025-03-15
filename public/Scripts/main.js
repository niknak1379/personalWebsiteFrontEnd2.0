window.onload = (event) => {
    let contactMeLink = document.getElementById('contactMeLink');
    //contactMeLink.addEventListener('click', openContactMe);
    if ('serviceWokrer' in navigator) {
         registerServiceWorker();
    }
   
    setTimeout(() => {
        document.documentElement.style.setProperty('--theme-change-timing', '0.5s');
    }, "1000")
    

    /* let theme = localStorage.getItem('theme');
    console.log(theme);
    let checkBoxList = document.body.querySelectorAll('.lightModeToggle');
    if (theme === 'light') {
        for (let i = 0; i < checkBoxList.length; i++) {
            checkBoxList[i].checked = false;
            checkBoxList[i].click();
        }
    }
    if (theme === 'dark') {
        for (let i = 0; i < checkBoxList.length; i++) {
            checkBoxList[i].checked = true;
            checkBoxList[i].click();
            
        }
    } */

    let footerLogoLink = document.querySelector('footer a.logo');
    let footerLogo = document.querySelector('footer img.logo');

    footerLogoLink.style.height = footerLogo.offsetHeight + 'px';

    let heroImgWrapper = document.querySelector('div.heroImgWrapper');
    let heroSVG = document.querySelector('img.heroSVG');

    heroImgWrapper.style.width = `${heroSVG.clientWidth}` + 'px';
};

window.addEventListener('resize' ,() => {
    let footerLogoLink = document.querySelector('footer a.logo');
    let footerLogo = document.querySelector('footer img.logo');

    footerLogoLink.style.height = footerLogo.offsetHeight + 'px';

    let heroImgWrapper = document.querySelector('div.heroImgWrapper');
    let heroSVG = document.querySelector('img.heroSVG');

    heroImgWrapper.style.width = `${heroSVG.clientWidth}` + 'px';
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

/**
     * open the contactMe dialog and adds blur class to the background 
     * windows and adds the submit handler to the form, and check Email
     * field for validity
     *
     * @function
     */
/* function openContactMe() {

    //add blur to the background
    let main = document.querySelector('main');
    let header = document.querySelector('header');
    let footer = document.querySelector('footer');
    footer.classList.add('blur');
    main.classList.add('blur');
    header.classList.add('blur');

    //show the dialog
    let dialog = document.getElementById("contactMe");
    dialog.show();

    //add the event listerner for submit to the contactme form
    let form = document.getElementById("contactMeForm");
    form.addEventListener('submit', submitForm);

    //adds the event listener to make sure the email is 
    //a valid input
    let email = document.getElementById("Email");
    email.addEventListener('focusout', changeEmailCSS);
} */

/**
     * closes the dialog  containing the form and removes the blur from
     * the background
     *
     * @function
     */
/* function closeForm() {

    //remove the blur from background elements
    let main = document.querySelector('main');
    let header = document.querySelector('header');
    let footer = document.querySelector('footer');
    footer.classList.remove('blur');
    main.classList.remove('blur');
    header.classList.remove('blur');

    //close the dialog
    let dialog = document.getElementById("contactMe");
    dialog.close();
} */

/**
     * handles the submit event of the form and make the requests
     * to the server to submit the email through emailJS
     *
     * @function
     * @param {event} [event] - takes in the submit event 
     */
/* function submitForm(event) {
    event.preventDefault();
    
    //check email fields for validity and throw alert if not valid
    from_name = document.getElementById("Name").value;
    emailId = document.getElementById("Email").value;
    message = document.getElementById("Message").value;
    
    if (from_name == '' || !validateEmail(emailId) || message == '')  {
        alert('please fill all inputs, or email invalid');
        return;
    }
    
    //grap from captcha 
    var formData = new FormData(document.getElementById('contactMeForm'));
    var captchaResponse = formData.get('g-recaptcha-response');

    //json stringify the data to be sent in the body of the post 
    //method to the server
    let data = JSON.stringify({
        from_name: from_name,
        emailId: emailId,
        message: message,
        captcha: captchaResponse
    });
    
    //handle the fetch event to the server
    //let url = 'http://localhost:8000/sendEmail'; //local url
    let url = 'https://personal-website-six-brown-33.vercel.app/sendEmail'; //vercel url
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => {
        //handle bad error codes and throw error
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        //show banner that the message was sent
        //and clear input fields
        clearInputFields();
        handleMessageResultDialog(1);
        return response.json();
    })

    //show banner that the message was not sent
    .catch(error => {
        console.error('Error:', error);
        handleMessageResultDialog(0);
    });

    //remove event listener from the email field and close the form dialog
    let email = document.getElementById("Email");
    email.removeEventListener('focsout', changeEmailCSS);
    closeForm();
}
 */
/* *
     * shows a success dialog if passed in 1 or a failure dialog
     * if a 0 is passsed in 
     *
     * @function
     * @param {int} [status] - binary wether the message was successful or not
     */
/* function handleMessageResultDialog(status) {

    //get the current dialog
    if (status == 1) {
        dialog = document.getElementById('messageSuccessDialog');
    }
    else {
        dialog = document.getElementById('messageFailureDialog');
    }
    
    //open the dialog and close it after the animation is done
    //through changing the class by adding hiding and removing it
    dialog.show();
    setTimeout(() => {
        dialog.classList.add('hiding');
    }, 2000);
    setTimeout(() => {
        dialog.classList.remove('hiding');
        dialog.close();
    }, 2900);
} */


/**
     * if email validation has failed change the css of the email
     * input field so that the borders and outlines are red
     *
     * @function
     */
/* function changeEmailCSS() {

    //check the validity of the email
    let emailField= document.getElementById('Email');
    let emailVlaue = emailField.value;
    let emailValidity = validateEmail(emailVlaue);

    //if email is invalid add invalid to the class list
    if (! emailValidity ) {
        emailField.classList.add('invalid');
        document.getElementById('emailSpan').style.display = 'block';
    }

    //if email is valid remove invalid class list
    if (emailValidity || emailVlaue == '') {
        //remove the class or sth
        emailField.classList.remove('invalid');
        document.getElementById('emailSpan').style.display = 'none';
    }
} */

/**
     * checks wether the email input string passes the regex test
     *
     * @function
     * @param {string} [email] - takes in email inputed by the user
     */
/* function validateEmail(email) {
    var re = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/; 
    return re.test(email);
} */


/**
     * clears the values of the inputs in the contactMe form when called
     *
     * @function
     */
/* function clearInputFields(){
    document.getElementById("Name").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("Message").value = "";
}   */

/**
     * opens the side bar containing the nav bar in mobile view
     *
     * @function
     * 
     * @param (event) - takes in the click event
     */
/* function openSideBar(event) {

    let sidebar = document.querySelector("aside")
    let background = document.querySelector('main');
    let footer = document.querySelector('footer');

    //if hamburger menu pressed open side bar
    if (event.target.checked == true) {
        //enable the sidebar
        sidebar.classList.remove('disabled');
        sidebar.classList.add('active');
        
        

        //add blur to the background
        document.body.style.overflow = "hidden";
        background.classList.add('blurTimed');
        footer.classList.add('blurTimed');

        //add click listener to the background to close the menu
        background.addEventListener('click', (e) => {
            event.target.checked = false;
            openSideBar(e);
        })
        footer.addEventListener('click', (e) => {
            event.target.checked = false;
            openSideBar(e);
        })
    
    }

    //close sidebar if menu has been pressed
    else {

        //disables the sidebar
        sidebar.classList.remove('active');
        sidebar.classList.add('disabled');

        //remove the blur from the background
        document.body.style.overflow = "auto";
        background.classList.remove('blurTimed');
        footer.classList.remove('blurTimed');

        //remove the added event listener
        background.removeEventListener('click', (e) => {
            event.target.checked = false;
            openSideBar(e);
        })
        footer.removeEventListener('click', (e) => {
            event.target.checked = false;
            openSideBar(e);
        })
    }
} */

/**
     * changes the css by adding and removing a lightMode class to change
     * the theme
     *
     * @function
     * 
     * @param (event) - takes in the click event
     */
/* function toggleTheme(event) {

    let body = document.body;
    let sideBar = document.body.querySelector('aside');
    let hamburgerNav = document.body.querySelector('.hamburgerNav');
    let logo = document.querySelector('img.darkLogo');
    let footerLogo = document.querySelector('footer img.darkLogo');
    let header = document.querySelector('header');
    let contactMeDialog = document.querySelector('dialog.contactMeDialog');
    let contactMeDialogHead = document.querySelector('#dialogHeader');
    let dialogCloseButton= document.querySelector('#closeButton');
    let dialogInput= document.querySelectorAll('dialog.contactMeDialog input');
    let textArea = document.querySelector('textArea');
    
    


    let cardList = document.body.querySelectorAll('.Card');
    let sliderThumbList = document.body.querySelectorAll('.ScrollThumb');

    let toggleArray = [body, sideBar, hamburgerNav, logo, footerLogo, 
        header, contactMeDialog, contactMeDialogHead, dialogCloseButton, textArea];
    //toggleArray = toggleArray.concat(cardList, sliderThumbList);

    //if light mode activated change to light mode
    if (event.target.checked == true) {
        localStorage.setItem('theme', 'light');
        //console.log('set to light');

        for (let i = 0; i < toggleArray.length; i++) {
            toggleArray[i].classList.add('lightMode');
        }

        for (let i = 0; i < cardList.length; i++) {
            cardList[i].classList.add('lightMode');
        }

        for (let j = 0; j < sliderThumbList.length; j++) {
            sliderThumbList[j].classList.add('lightMode');
        }

        for (let j = 0; j < dialogInput.length; j++) {
            dialogInput[j].classList.add('lightMode');
        }
    }

    //if dark mode activated remove light mode
    else {
        localStorage.setItem('theme', 'dark');
        //console.log('set to dark');

        for (let i = 0; i < toggleArray.length; i++) {
            toggleArray[i].classList.remove('lightMode');
        }

        for (let i = 0; i < cardList.length; i++) {
            cardList[i].classList.remove('lightMode');
        }
        
        for (let j = 0; j < sliderThumbList.length; j++) {
            sliderThumbList[j].classList.remove('lightMode');
        }

        for (let j = 0; j < dialogInput.length; j++) {
            dialogInput[j].classList.remove('lightMode');
        }
    }
} */