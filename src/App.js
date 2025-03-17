import './App.css';
import Home from './pages/Home'
import Header from './UI/Header';
import Projects from './pages/Projects';
import { Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';

/**
 * Component Description: Displays the past and current projects on the website
 *
 * @component
 * @returns {JSX.Element} react component with interactable gallery of projects
 */
function App() {

  
 
  
  
  return (
    <div className="App">
    <Suspense fallback={<div className="container">Loading...</div>}>
          <Routes>
             <Route path="/" element={
              <div>
                <Header />
                <Home />
              </div>
              
             }/>
             <Route path="/Projects" element={
                <div>
                    <Header />
                    <Projects />
                </div>
                
             }/>
             {/* <Route path="/privacy" element={
                <div>
                  <Header links = {['Home']}/>
                  <Privacy/>
                </div>
             
             }/>
             <Route path='/terms' element={
                <div>
                    <Header links = {['Home']}/>
                    <Terms/>
                  </div>
              
             }/> */}
          </Routes>
       </Suspense>
    </div>
  );
}

export default App;
