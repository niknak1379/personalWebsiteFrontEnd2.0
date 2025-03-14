import './App.css';
import ProjectCard  from './ProjectCard';
import Gallery from './Gallery';
import fetch from 'node-fetch';
import { useEffect } from 'react';
import { useState } from 'react';

/**
 * Component Description: Displays the past and current projects on the website
 *
 * @component
 * @returns {JSX.Element} react component with interactable gallery of projects
 */
function App() {
  /* const GalleryDetails1 {
  
  } */
  
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
  const homeLab = {
    ImgUrl : '/Assets/App/Cards/ProjectPics/homelab.avif',
    ProjectName: 'personal home Lab',
    ProjectDes: 'just a homelab to experiment with things',
    Tags: ['Scripts', 'IT'],
    Link: '',
    Github: '',
  };
  
  
  return (
    <div className="App">

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

export default App;
