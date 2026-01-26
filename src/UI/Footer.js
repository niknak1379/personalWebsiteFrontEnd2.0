export default function Footer() {
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
    return (
        <footer>
            <button id="footerButton" onClick={scrollToTop} aria-label="scroll to top">
                <img src="/Assets/Footer/topArrow.png" alt="top arrow" loading="lazy"/>
            </button>

                <a href = "%PUBLIC_URL%" className="logo">
                <img className="logo lightLogo" src="Assets/Header/logoLight.avif" alt="nikan logo"/>
                <img className="logo darkLogo" src="Assets/Header/logoDark.avif" alt="nikan logo"/>
                </a>

                <ul className="footerLinks">
                <li>
                    <a href="#introduction">About</a>
                </li>
                <li>
                    <a href="">Misson</a>
                </li>
                <li>
                    <a href="/Pages/privacy.html" target="_blank">Privacy Policy </a>
                </li>
                <li>
                    <a href="/Pages/TOS.html" target="_blank">Terms of Service</a>
                </li>
                <li>
                    <a href="#root">Services</a>
                </li>
                <li>
                    <a href="#root">Products</a>
                </li>
                <li>
                    <a id='contactMeLink' href="#header">Contact Me</a>
                </li>
                <li>
                    <a href="%PUBLIC_URL%/Pages/404.html">Hobby Section</a>
                </li>
                </ul>

                <ul className="footerIcon">
                    <li>
                    <a href = 'https://www.linkedin.com/in/nikanostovan/' aria-label="linkedin link" target="_blank" rel="noreferrer">
                        <img src={process.env.PUBLIC_URL + '/Assets/Footer/linkedin.svg'} alt="linkedin logo" loading="lazy"/> 
                    </a>
                    </li>

                    <li>
                    <a href = 'https://github.com/niknak1379/' aria-label="github link" target="_blank" rel="noreferrer">
                        <img src={process.env.PUBLIC_URL + '/Assets/Footer/github.svg'} alt="github logo" loading="lazy"/> 
                    </a>
                    </li>

                    <li>
                    <a href = 'https://www.instagram.com/1he.w4rst/' aria-label="instagram link" target="_blank" rel="noreferrer">
                        <img src={process.env.PUBLIC_URL + '/Assets/Footer/instagram.svg'} alt="instagram logo" loading="lazy"/> 
                    </a>
                    </li>
                </ul>

                <h4>MADE WITH REACT BY NIKAN</h4>
                <small>&copy; Copyright 2024, Nikan Ostovan</small>
            </footer>
    );
}