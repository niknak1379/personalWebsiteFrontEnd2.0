export default function Header(){
    return (
        <header id = "header">
        <div class="header">
        <a href = "%PUBLIC_URL%" class="logo">
          <img class="logo lightLogo" src="Assets/Header/logoLight.avif" alt="nikan logo"></img>
          <img class="logo darkLogo" src="Assets/Header/logoDark.avif" alt="nikan logo"></img>
        </a>
        <nav class="mainNav">
            <ul class="navList">
              <li>
                <a href = "%PUBLIC_URL%">Home</a>
              </li>
              <li>
                <a href = "%PUBLIC_URL%">About Me</a>
              </li>
            </ul>
        </nav>
  
        <div class="contactButtonWraper">
          <input type="checkbox" class="lightModeToggle" id="checkHeader" onclick="toggleTheme(event)" tabindex="0"></input>
          <label for="checkHeader" class="darkModeLabel" aria-label="Toggle dark mode" aria-pressed="false" tabindex="0">
              <img src="Assets/Header/Sun.svg" class='lightToggle' alt="sun Icon"></img>
              <img src="Assets/Header/Moon.png" class='darkToggle' alt="moon Icon"></img>
              <span class="ball"></span>
          </label>
  
          <button class="contactButton" onclick="openContactMe()">Lets Talk</button>
        </div>
  
        <label class="hamburgerNav" tabindex="0" aria-label="hamburger menu" aria-pressed="false">
          <input type="checkbox" onclick="openSideBar(event)"></input>
        </label>
      </div>

{/*       <hr class="headerDivider"></hr> */}


      <aside class="sidebar disabled">
        <nav class="mobileNav">
          <ul class="navList">
            <li>
              <a href = "">Home</a>
            </li>
            <li>
              <a href = "">About Me</a>
            </li>
          </ul>
        </nav>

        <hr class="navDivider"></hr>

        <div class="contactButtonWraper">

          <input type="checkbox" class="lightModeToggle" id="check" onclick="toggleTheme(event)"></input>
          <label for="check" class="darkModeLabel" aria-label="Toggle dark mode" aria-pressed="false" tabindex="0">
            <img src="Assets/Header/Sun.svg" class='lightToggle' alt="sun Icon"></img>
            <img src="Assets/Header/Moon.png" class='darkToggle' alt="moon Icon"></img>
            <span class="ball"></span>
          </label>

          <button class="contactButton" onclick="openContactMe()">Lets Talk</button>
        </div>
      </aside>
    </header>
    );
}