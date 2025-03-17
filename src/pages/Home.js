import '../App.css';
import ProjectCard  from '../UI/ProjectCard';
import Gallery from '../UI/Gallery';
import LoadingError from '../UI/LoadingError';
import fetch from 'node-fetch';
import { useEffect, useState, useRef } from 'react';
import userEvent from '@testing-library/user-event';


/**
 * Component Description: Displays the past and current projects on the website
 *
 * @component
 * @returns {JSX.Element} react component with interactable gallery of projects
 */
export default function Home() {

  
  const [completedProjects, setcompletedProjects] = useState([])
  const [incompletedProjects, setincompletedProjects] = useState([])
  const [gettingProjects, setGettingProjects] = useState(false)
  const [projectError, setProjectError] = useState(false)
  const h1Ref = useRef(null)
  let fetchError = null
  useEffect(() => {
    //expected data structure from the server side getProjects API
    /*
    { 
      {
        "name": "nik",
        "description": "longs d fs sdj ds ",
        "status": "Complete",
        "pictureURL": "pic url",
        "githubURL": "git url",
        "deploymentURL": "dep url",
        "tag": "ALL"
      }
    */
    
    async function getData() {
      try{
        let complete_data = (await fetch('http://localhost:8080/ /Complete/ /'))
        let comp = await complete_data.json()
        let incomp_data = (await fetch('http://localhost:8080/ /In Progress/ /'))
        let incomp = await incomp_data.json()
        setcompletedProjects(comp)
        setincompletedProjects(incomp)
      }
      catch(error){
        setProjectError(true)
        fetchError = error
        console.log(error)
      }
    }
    setGettingProjects(true)
    getData()
    setGettingProjects(false)
    animate()
  },[])

  let i = 0;
  let started = false;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();
  let interval = null;

  /*
  * animates the H1 header tag with a cool typewriter animation
  */
  function animate() {
    let introText = h1Ref.current;

    started = true;
    introText.innerHTML = 'Hi! I\'m Nikan!!';
    typingAdvanced(introText);
    i = 0;
    window.addEventListener('scroll', () => {
        if(isInViewport(introText) && !started) {
            started = true;
            typingAdvanced(introText);
  
        }
        if (!isInViewport(introText)){
            started = false;
            i = 0;
        }
    })
  }
  /*
  * detects when the h1 tag is in the view port.
  * used to knowing when to re run the animation
  */
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    );
  }
  /*
  * the typewriter logic is in here, using intervals.
  */
  function typingAdvanced(targetElement) {  
    let iteration = 0;
    console.log('hi');
    clearInterval(interval);
    
    interval = setInterval(() => {
      targetElement.innerText = targetElement.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return targetElement.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");
      
      if(iteration >= targetElement.dataset.value.length){ 
        clearInterval(interval);
      }
      
      iteration += 1/3;
    }, 30);
  }

  return (
    <div className="Home">
      <section id="introduction">

        <section className="hero">
          <div className="heroImgWrapper">
            <img className="heroSVG" src = {process.env.PUBLIC_URL + `/Assets/Main/1.svg`} alt = "background svg"></img>
            <img className="heroImg" src = {process.env.PUBLIC_URL + '/Assets/Main/hero.png'} alt = "nikan's image"></img>
          </div>
          <div className="heroText">
            <h1 ref={h1Ref} id="heroHeader" data-value="Hi! I'm Nikan!!" aria-valuetext="Hi! I'm Nikan!!">s</h1>
            <p id="heroText">Just a recently graduated student trying his best at web-development and design</p>
          </div>
        </section>

        <h2 id="Skillset">Skillset</h2>
        <h3 id="SkillsetExplanation">Diverse set of skills usefull for web-development</h3>

        <table>
          <tbody>
            <tr>
              <th>Web Development</th>
              <td>Working on it</td>
            </tr>
            <tr>
              <th>Web Design using figma</th>
              <td>also working on it</td>
            </tr>
            <tr>
              <th>Web Design using figma</th>
              <td>also working on it</td>
            </tr>
            <tr>
              <th>Web Design using figma</th>
              <td>also working on it</td>
            </tr>
          </tbody>
        </table>
        </section>
      {/* past projects to be displayed */}
      <section id="pastProjects">
        <h2>Past Projects</h2>
        {gettingProjects && <Gallery projects = {[]} isLoading={true} parent = "past"/>}  
        {!gettingProjects && !projectError && <Gallery projects = {completedProjects} isLoading={false} parent = "past"/>}
        {projectError && <LoadingError error={fetchError}/>}
      </section>

      {/* current projects to be displayed */}
      <section id="currentProjects">
        <h2>Current Projects</h2>
        {gettingProjects && <Gallery projects = {[]} isLoading={true} parent = "current"/>}  
        {!gettingProjects && <Gallery projects = {incompletedProjects} isLoading={false} parent = "current"/>}
        {projectError && <LoadingError error={fetchError}/>}
      </section>
    </div>
  );
}


