import './LoadingError.css'
export default function LoadingError(props){
    console.log('loading error being displayed???')
    return (
        <div className="networkError">
            <img alt='error image' src={process.env.PUBLIC_URL + './Assets/App/Cards/error.avif'}></img>
            Sorry the application has encountered the following error: <br></br>
            {props.error}
        </div>
    )
}