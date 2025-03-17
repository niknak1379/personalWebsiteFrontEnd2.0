import './LoadingPlaceHolder.css'
export default function LoadingPlaceHolder(){
    console.log('adding placeholder')
    return (
        <li className="Card skeletonLoading">

            <img className = "ProjectPic" src={process.env.PUBLIC_URL + 'Assets/App/Cards/ProjectPics/placeholder.avif'} 
                alt = 'Place holder picture'/> 
            <div className='CardTexts'>

                <h3>placeholder</h3>
                <p>place holder<br></br>hh</p>
                
                <hr></hr>

    

                <ul className='Icons'>
                    <li>
                        <a href = '' aria-label="website link" target="_blank">
                            <img src={process.env.PUBLIC_URL + '/Assets/App/Cards/Icons/link.png'} alt="link icon"/> 
                        </a>
                    </li>    
                    <li>
                        <a href = '' aria-label="github link" target="_blank">
                            <img src={process.env.PUBLIC_URL + '/Assets/App/Cards/Icons/github.svg'} alt="github icon"/> 
                        </a>
                    </li>
                </ul>
            </div>
        </li>
    );
}