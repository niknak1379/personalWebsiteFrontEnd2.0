import './App.css';
import Home from './pages/Home'
import Header from './UI/Header';
import Projects from './pages/Projects';
import { Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';
import Footer from './UI/Footer';
import Login from './pages/login';
import { AuthProvider } from './context/authProvider';
import EditPage from './pages/editProjectsPage';

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
        <Header />
          <Routes>
             <Route path="/" element={<Home />}/>
             <Route path="/Projects" element={<Projects />}/>
             <Route path="/Login" element={<Login />}/>
             <Route path='/edit' element={<EditPage />}/>
          </Routes>
          <Footer />
       </Suspense>
    </div>
  );
}

export default App;
