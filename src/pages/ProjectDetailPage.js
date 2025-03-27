import { useState, useRef, useEffect } from "react"
import './projectDetailPage.css'
import LoadingError from "../UI/LoadingError"
export default function ProjectDetailPage(props){
    const [isLoading, setLoading] = useState(null)
    const [error, setError] = useState(false)
    const [projData, setData] = useState(null)
    const dialogRef = useRef(null)
    useEffect(() => {
        
        async function getProjectDetails(){
            setError(false)
            setLoading(true)
            try{
                let data = await fetch('http://localhost:8080/projectDetails/' + props.CardData.name)
                let readabledata = await data.json()
                setData(readabledata)
                console.log(readabledata)
            }
            catch(e){
                setError(true)
                console.log(e)
            }
            finally{
                setLoading(false)
            }
        }
        if (props.DialogStatus){
            console.log('opening bc of state')
            dialogRef.current?.showModal()
            getProjectDetails()
        }
        if (!props.DialogStatus){
            console.log('closing bc of state')
            dialogRef.current?.close()
        }
    }, [props.DialogStatus])
    
    return (
        <dialog className='projectDetailPage' ref={dialogRef}>
            {isLoading && <span>Loading...</span>}
            {!isLoading && !error && (projData != null) &&
            <div className="dialogWrapper">
                <div className="imgCarousel">
                    <img src={projData.pictureURL}></img>
                    <img className="carousel" src={projData.carouselImage_1}></img>
                    <img className="carousel" src={projData.carouselImage_2}></img>
                    <img className="carousel" src={projData.carouselImage_3}></img>
                </div>
                <div className="textDetails">
                    <h1>{props.CardData.name}</h1>
                    <h2>{projData.status}</h2>
                    <p>{projData.longDescription}</p>
                    <ul className="tagsList">
                        {
                            projData.tags.map(item => {
                                return <li>{item}</li>
                            })
                        }
                    </ul>
                    <ul className="linksList">
                        <li>
                            Deployment URL: {props.CardData.deploymentURL}
                        </li>
                        <li>
                            Repository: {props.CardData.githubURL}
                        </li>
                        <li>
                            Notes and Documentation: placeHolder
                        </li>
                    </ul>
                </div>
            </div>
            }
            {error && <LoadingError />}
            <button onClick={() => {
                console.log('closing')
                props.DialogStatusFunc(false)}}
            >
                Close
            </button>
        </dialog>
    )
}