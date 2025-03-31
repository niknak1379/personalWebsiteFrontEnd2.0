import { use } from "react";
import { useRef, useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import { Link } from "react-router";

export default function Header(){
    const [isContactMeOpen, setContactMe] = useState(false);
    const themeBox = useRef(null)
    const themeBoxMobile = useRef(null)
    //To initialize the theme from LocalStorage
    useEffect(() => {
        function initTheme(){
            let theme = localStorage.getItem('theme')
            if (theme == null) {
                localStorage.setItem('theme', 'dark')
                return
            }
            
            console.log(theme)
            if (theme === 'light'){
                
                themeBox.current.checked = true
                themeBoxMobile.current.checked = true
                document.body.classList.add('lightMode')
            }

        }
        initTheme()
        console.log('after init', themeBox.current.checked, themeBoxMobile.current.checked)
    }, [])
    /**
     * open the contactMe dialog and adds blur className to the background 
     * windows and adds the submit handler to the form, and check Email
     * field for validity
     *
     * @function
     */
    function openContactMe() {

        //add blur to the background
        let main = document.querySelector('header + *');
        let header = document.querySelector('header');
        let footer = document.querySelector('footer');
        console.log(header, footer)
        footer.classList.add('blur');
        main.classList.add('blur');
        //header.classList.add('blur');

        //show the dialog
        setContactMe(true)
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
        let background = document.querySelector('.Background');
        let footer = document.querySelector('footer');
        //console.log('initial', checkBox.current.checked, background)
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
                //console.log('from listener to close on menu', checkBox.current.checked)
                openSideBar();
            })
            footer.addEventListener('click', () => {
                //console.log('from listener to close on footer', checkBox.current.checked)
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
    function toggleTheme() {
        //console.log('toggling theme', themeBox.current.checked, themeBoxMobile.current.checked, localStorage.getItem('theme'))
        if (localStorage.getItem('theme') == 'dark') {
            document.body.classList.add('lightMode')
            localStorage.setItem('theme', 'light')
            //sync both inputs
            themeBoxMobile.current.checked = true
            themeBox.current.checked = true
        }
        else{
            document.body.classList.remove('lightMode')
            localStorage.setItem('theme', 'dark')
            //sync both inputs
            themeBoxMobile.current.checked = false
            themeBox.current.checked = false
        }
        //console.log('toggling theme', themeBox.current.checked, themeBoxMobile.current.checked)
    }
    return (
        <header id = "header">
            <div className="header">
                <a href = {process.env.PUBLIC_URL} className="logo">
                    <img className="logo lightLogo" src="Assets/Header/logoLight.avif" alt="nikan logo"></img>
                    <img className="logo darkLogo" src="Assets/Header/logoDark.avif" alt="nikan logo"></img>
                </a>
                <nav className="mainNav">
                    <ul className="navList">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Projects">Projects</Link>
                        </li>
                    </ul>
                </nav>
        
                <div className="contactButtonWraper">
                    <input ref={themeBox} type="checkbox" className="lightModeToggle" id="checkHeader" onClick={toggleTheme} tabIndex="0"></input>
                    <label htmlFor="checkHeader" className="darkModeLabel" aria-label="Toggle dark mode" aria-pressed="false" tabIndex="0">
                        <img src="Assets/Header/Sun.svg" className='lightToggle' alt="sun Icon"></img>
                        <img src="Assets/Header/Moon.png" className='darkToggle' alt="moon Icon"></img>
                        <span className="ball"></span>
                    </label>
            
                    <button className="contactButton" onClick={openContactMe}>Lets Talk</button>
                </div>
        
                <label className="hamburgerNav" tabIndex="0" aria-label="hamburger menu" aria-pressed="false">
                    <input ref={checkBox} type="checkbox" onClick={openSideBar}></input>
                </label>
            </div>

        {/* <hr className="headerDivider"></hr> */}


        <aside className="sidebar disabled">
            <nav className="mobileNav">
            <ul className="navList">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Projects">Projects</Link>
                </li>
            </ul>
            </nav>

            <hr className="navDivider"></hr>

            <div className="contactButtonWraper">

                <input ref={themeBoxMobile} type="checkbox" className="lightModeToggle" id="check" onClick={toggleTheme}></input>
                <label htmlFor="check" className="darkModeLabel" aria-label="Toggle dark mode" aria-pressed="false" tabIndex="0">
                    <img src="Assets/Header/Sun.svg" className='lightToggle' alt="sun Icon"></img>
                    <img src="Assets/Header/Moon.png" className='darkToggle' alt="moon Icon"></img>
                    <span className="ball"></span>
                </label>

                <button className="contactButton" onClick={openContactMe}>Lets Talk</button>
            </div>
        </aside>
        <ContactForm IsOpen={isContactMeOpen} setisOpen={setContactMe}/>
     </header>
    );
}