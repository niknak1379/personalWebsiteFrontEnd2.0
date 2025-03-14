import '../App.css';
import ProjectCard  from '../UI/ProjectCard';
import Gallery from '../UI/Gallery';
import fetch from 'node-fetch';
import { useEffect } from 'react';
import { useState } from 'react';

/**
 * Component Description: Displays the past and current projects on the website
 *
 * @component
 * @returns {JSX.Element} react component with interactable gallery of projects
 */
export default function Home() {

  
  const [completedProjects, setcompletedProjects] = useState([])
  const [incompletedProjects, setincompletedProjects] = useState([])
  useEffect(() => {
    async function getData() {
      let complete_data = (await fetch('http://localhost:8080/ /Complete/ /3'))
      let comp = await complete_data.json()
      let incomp_data = (await fetch('http://localhost:8080/ /In Progress/ /3'))
      let incomp = await incomp_data.json()
      setcompletedProjects(comp)
      setincompletedProjects(incomp)
      
    }
    getData()
    console.log('sattes', completedProjects, incompletedProjects)
  },[])
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

  
  
  return (
    <div className="Home">
      <section id="introduction">

        <section class="hero">
          <div class="heroImgWrapper">
            <img class="heroSVG" src = {process.env.PUBLIC_URL + `/Assets/Main/1.svg`} alt = "background svg"></img>
            <img class="heroImg" src = {process.env.PUBLIC_URL + '/Assets/Main/hero.png'} alt = "nikan's image"></img>
          </div>
          <div class="heroText">
            <h1 id="heroHeader" data-value="Hi! I'm Nikan!!" aria-valuetext="Hi! I'm Nikan!!">s</h1>
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
        <Gallery projects = {completedProjects} parent = "past"/>
      </section>

      {/* current projects to be displayed */}
      <section id="currentProjects">
        <h2>Current Projects</h2>
        
        <Gallery projects = {incompletedProjects} parent = "current"/>
      </section>
    </div>
  );
}


