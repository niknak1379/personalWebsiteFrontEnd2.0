import { Simulate } from 'react-dom/test-utils'
import './Projects.css'
import { useEffect, useState, useRef } from 'react'
import ProjectCard from '../UI/ProjectCard'
import LoadingPlaceHolder from '../UI/LoadingPlaceHodler'
import LoadingError from '../UI/LoadingError'
import userEvent from '@testing-library/user-event'
export default function Projects(){
    const [isLoading, setIsLoading] = useState(false) //update UI for loading components
    const [sideBarLaoding, setSideBarLoading] = useState(false) //update UI for loading components
    const [error, setError] = useState(false) //to catch errors from fetch from server
    const [projError, setProjError] = useState(false)
    const [reTry, setReTry] = useState(false) //if user presses retry server after an error
    const [tagsArr, setTagsArr] = useState([])
    const [statusArr, setStatusArr] = useState([])
    const [projectArr, setProjArr] = useState([])
    const tagsDropDownRef = useRef(null)
    const statusDropDownRef = useRef(null)
    const formRef = useRef(null)
    useEffect(() => {
        async function fetchTags(){
            setSideBarLoading(true)
            try{
                let data = await fetch('http://localhost:8080/tags')
                let tags = await data.json()
                setTagsArr(tags)
                //console.log(tagsArr)
            }
            catch(error){
                setError(true)
            }
            finally{
                setSideBarLoading(false)
            }
        }
        async function fetchStatus(){
            try{
                let data = await fetch('http://localhost:8080/status')
                let status = await data.json()
                setStatusArr(status)
                //console.log(statusArr)
            }
            catch(error){
                setError(true)
            }
        }
        async function fetchInitProjects(){
            setIsLoading(true)
            try{
                let data = await fetch('http://localhost:8080/ / / /10')
                let projects = await data.json()
                setProjArr(projects)
            }
            catch(error){
                setProjError(true)
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchTags()
        fetchStatus()
        fetchInitProjects()
    }, [reTry])

    const listTags = tagsArr.map(item => {
        return (

            <li key={item.tag}>
                <input id={item.tag} name={item.tag} type='checkbox'></input>
                <label htmlFor={item.tag}> {item.tag} ({item.Frequency})</label>
            </li>
        )
    })
    const listStatus = statusArr.map(item => {
        return (
            <li key={item.status}>
                <input id={item.status} name={item.status} type='checkbox'></input>
                <label htmlFor={item.status}> {item.status} ({item.Frequency})</label>
            </li>
        )
    })

    async function fetchSearchQuery(){
        setIsLoading(true)
        try{
            let data = new FormData(formRef.current)
            console.log(data)
            /* let data = await fetch('http://localhost:8080/ / / /10')
            let projects = await data.json() */
            setProjArr([])
        }
        catch(error){
            setProjError(true)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="Home1">

            {!error &&
                <div className='projectSidebar'>
                    {!sideBarLaoding && <form ref={formRef} id='searchQuery'>
                        <label htmlFor='searchBar'>Search:</label>
                        <input name='searchBar'></input>
                        <button onClick={(e) =>{
                            e.preventDefault()
                            if (tagsDropDownRef.current.classList.contains('hidden')){
                                tagsDropDownRef.current.classList.remove('hidden')
                                tagsDropDownRef.current.classList.add('unhidden')
                            }
                            else{
                                tagsDropDownRef.current.classList.add('hidden')
                                tagsDropDownRef.current.classList.remove('unhidden')
                            }
                        }}>Tags

                        </button>

                            <fieldset ref={tagsDropDownRef} className='tags hidden'>
                                <legend>Project Tags</legend>
                                <ul >
                                <li></li>
                                {listTags}
                            </ul>
                            </fieldset>
                            
                        <button onClick={(e) =>{
                            e.preventDefault()
                            if (statusDropDownRef.current.classList.contains('hidden')){
                                statusDropDownRef.current.classList.remove('hidden')
                                statusDropDownRef.current.classList.add('unhidden')
                            }
                            else{
                                statusDropDownRef.current.classList.add('hidden')
                                statusDropDownRef.current.classList.remove('unhidden')
                            }
                        }}>status</button>
                        <fieldset ref={statusDropDownRef} className='status hidden'>
                            <legend>Project Status</legend>
                            <ul>
                                {listStatus}
                            </ul>
                        </fieldset>
                        
                        <button type='submit' onClick={(e)=>{
                            e.preventDefault()
                            fetchSearchQuery()
                            }}>
                            Search</button>
                    </form>}
                    {sideBarLaoding &&
                        <div className='sidebarLoading'>
                            Loading <span><span></span></span>
                        </div>
                    }
                </div>
            }
            {error &&
                <div className='projectSidebar projectSidebarError'>
                    <img src={process.env.PUBLIC_URL + './Assets/App/Cards/error.avif'}></img>
                    The sidebar encountered an error during a network request. Please check the console logs and try again!
                    <button className='refreshButton'id='reloadButton' onClick={() => (setReTry(true))}>
                        <span>Press to refresh</span>
                        <img alt='refresh icon button' src={process.env.PUBLIC_URL + './Assets/App/Cards/refreshIcon.svg'}></img>
                    </button>
                </div>

            }
            <div className='Projects'>
                <h1>Results</h1>
                {
                    isLoading &&
                    <ul className='projectList'>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
                        return <LoadingPlaceHolder key={i}/>
                    })}
                    </ul>
                }
                {
                    projError && 
                    <ul className='projectList'>
                        <LoadingError />
                    </ul>
                }

                {
                   !isLoading && !projError &&
                   <ul className='projectList'>
                        {projectArr.map(item => {
                            return (
                                <ProjectCard CardData={item} key={item.name}/>
                            )
                        })}
                        {projectArr.map(item => {
                            return (
                                <ProjectCard CardData={item} key={item.name}/>
                            )
                        })}
                        {projectArr.map(item => {
                            return (
                                <ProjectCard CardData={item} key={item.name}/>
                            )
                        })}
                    </ul>
                }
                
            </div>
            

        </div>
    )
}