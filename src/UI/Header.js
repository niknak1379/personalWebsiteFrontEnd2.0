import { use } from "react";
import { useRef } from "react";
export default function Header(){
    /**
     * open the contactMe dialog and adds blur className to the background 
     * windows and adds the submit handler to the form, and check Email
     * field for validity
     *
     * @function
     */
    function openContactMe() {

        //add blur to the background
        let main = document.querySelector('main');
        let header = document.querySelector('header');
        let footer = document.querySelector('footer');
        console.log(header, footer)
        footer.classList.add('blur');
        main.classList.add('blur');
        header.classList.add('blur');

        //show the dialog
        let dialog = document.getElementById("contactMe");
        dialog.show();

        //add the event listerner for submit to the contactme form
        let form = document.getElementById("contactMeForm");
        //form.addEventListener('submit', submitForm); #TODO

        //adds the event listener to make sure the email is 
        //a valid input
        let email = document.getElementById("Email");
        //email.addEventListener('focusout', changeEmailCSS); #TODO
    }

    const checkBox = useRef(null)
    /**
     * opens the side bar containing the nav bar in mobile view
     *
     * @function
     * 
     * @param (event) - takes in the click event
     */
    function openSideBar() {

        let sidebar = document.querySelector("aside")
        let background = document.querySelector('.Home');
        let footer = document.querySelector('footer');
        console.log('initial', checkBox.current.checked, background)
        //if hamburger menu pressed open side bar
        if (checkBox.current.checked == true) {
            //enable the sidebar
            sidebar.classList.remove('disabled');
            sidebar.classList.add('active');
            
            
    
            //add blur to the background
            document.body.style.overflow = "hidden";
            background.classList.add('blurTimed');
            footer.classList.add('blurTimed');
    
            //add click listener to the background to close the menu
            background.addEventListener('click', () => {
                checkBox.current.checked = false;
                console.log('from listener to close on menu', checkBox.current.checked)
                openSideBar();
            })
            footer.addEventListener('click', () => {
                console.log('from listener to close on footer', checkBox.current.checked)
                checkBox.current.checked = false;
                openSideBar();
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
    
        }
    }
    /**
     * changes the css by adding and removing a lightMode class to change
     * the theme
     *
     * @function
     * 
     * @param (event) - takes in the click event
     */
    const themeBox = useRef(null)
    const themeBoxMobile = useRef(null)
    function toggleTheme(event) {
        if (themeBox.current.checked || themeBoxMobile.current.checked) {
            document.body.classList.add('lightMode')
            localStorage.setItem('theme', 'light')
        }
        else{
            document.body.classList.remove('lightMode')
            localStorage.setItem('theme', 'dark')
        }
    }
    return (
        <header id = "header">
            <div className="header">
                <a href = "%PUBLIC_URL%" className="logo">
                    <img className="logo lightLogo" src="Assets/Header/logoLight.avif" alt="nikan logo"></img>
                    <img className="logo darkLogo" src="Assets/Header/logoDark.avif" alt="nikan logo"></img>
                </a>
                <nav className="mainNav">
                    <ul className="navList">
                    <li>
                        <a href = "%PUBLIC_URL%">Home</a>
                    </li>
                    <li>
                        <a href = "%PUBLIC_URL%">About Me</a>
                    </li>
                    </ul>
                </nav>
        
                <div className="contactButtonWraper">
                    <input ref={themeBox} type="checkbox" className="lightModeToggle" id="checkHeader" onClick={toggleTheme} tabindex="0"></input>
                    <label for="checkHeader" className="darkModeLabel" aria-label="Toggle dark mode" aria-pressed="false" tabindex="0">
                        <img src="Assets/Header/Sun.svg" className='lightToggle' alt="sun Icon"></img>
                        <img src="Assets/Header/Moon.png" className='darkToggle' alt="moon Icon"></img>
                        <span className="ball"></span>
                    </label>
            
                    <button className="contactButton" onClick={openContactMe}>Lets Talk</button>
                </div>
        
                <label className="hamburgerNav" tabindex="0" aria-label="hamburger menu" aria-pressed="false">
                    <input ref={checkBox} type="checkbox" onClick={openSideBar}></input>
                </label>
            </div>

        <hr className="headerDivider"></hr>


        <aside className="sidebar disabled">
            <nav className="mobileNav">
            <ul className="navList">
                <li>
                <a href = "">Home</a>
                </li>
                <li>
                <a href = "">About Me</a>
                </li>
            </ul>
            </nav>

            <hr className="navDivider"></hr>

            <div className="contactButtonWraper">

                <input ref={themeBoxMobile} type="checkbox" className="lightModeToggle" id="check" onClick={toggleTheme}></input>
                <label for="check" className="darkModeLabel" aria-label="Toggle dark mode" aria-pressed="false" tabindex="0">
                    <img src="Assets/Header/Sun.svg" className='lightToggle' alt="sun Icon"></img>
                    <img src="Assets/Header/Moon.png" className='darkToggle' alt="moon Icon"></img>
                    <span className="ball"></span>
                </label>

                <button className="contactButton" onClick={openContactMe}>Lets Talk</button>
            </div>
        </aside>
     </header>
    );
}