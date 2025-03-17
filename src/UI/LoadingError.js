import { useEffect } from 'react'
import './LoadingError.css'

export default function LoadingError(props){
    return (
        <div className="networkError">
            <div className='errorWrapper'>
                <img alt='error image' src={process.env.PUBLIC_URL + './Assets/App/Cards/error.avif'}></img>
                The application has encountered a network error. Please Try again! <br></br>
                <button className='refreshButton'id='reloadButton' onClick={window.location.reload.bind(window.location)}>
                    <span>Press to refresh</span>
                    <img alt='refresh icon button' src={process.env.PUBLIC_URL + './Assets/App/Cards/refreshIcon.svg'}></img>
                </button>
            </div>
            
        </div>
    )
}