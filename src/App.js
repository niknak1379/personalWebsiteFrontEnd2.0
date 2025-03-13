import './App.css';
import ProjectCard  from './ProjectCard';
import Gallery from './Gallery';
import fetch from 'node-fetch';
import { useEffect } from 'react';
import { use } from 'react';

/**
 * Component Description: Displays the past and current projects on the website
 *
 * @component
 * @returns {JSX.Element} react component with interactable gallery of projects
 */
function App() {
  /* const GalleryDetails1 {

  } */
  useEffect(() => {
    async function getData() {
      let data = await fetch('http://localhost:8080/ /Complete/ /3')
      let completed = await data.json()
      
    }
    getData()
  })
  const homeLab = {
    ImgUrl : '/Assets/App/Cards/ProjectPics/homelab.avif',
    ProjectName: 'personal home Lab',
    ProjectDes: 'just a homelab to experiment with things',
    Tags: ['Scripts', 'IT'],
    Link: '',
    Github: '',
  };
  //list of Jsons containing the project informations to be displayed
  let pastProjs = [homeLab];
  let currentProjs = [homeLab];
  
  
  return (
    <div className="App">

      {/* past projects to be displayed */}
      <section id="pastProjects">
        <h2>Past Projects</h2>
        <Gallery projects = {pastProjs} parent = "past"/>
      </section>

      {/* current projects to be displayed */}
      <section id="currentProjects">
        <h2>Current Projects</h2>
        <Gallery projects = {currentProjs} parent = "current"/>
      </section>
    </div>
  );
}

export default App;
