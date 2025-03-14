/**
 * Component Description: displays the details and images of the project
 *
 * @component
 * @param {Object} props                           - Component props
 * @param {Object} props.CardData                  - Object containing the project
 *                                                   details
 * @param {String} props.CardData.ImgUrl           - URL to the project image
 * @param {String} props.CardData.ProjectName      - Name of the project
 * @param {String} props.CardData.ProjectDes       - project description
 * @param {String} props.CardData.Tags             - List containing tags of the
 *                                                   project
 * @param {String} props.CardData.Github           - github link 
 * @param {String} props.CardData.Link             - website link
 * @returns {JSX.Element}                          - A React Node displaying thecard
 */

export default function ProjectCard(props) {
    return (
        <li className="Card">

            <img className = "ProjectPic" src={props.CardData.pictureURL} 
                alt = {props.CardData.name + ' screen shot'}/> 
            <div className='CardTexts'>

                <h3>{props.CardData.name}</h3>
                <p>{props.CardData.description}</p>
                
                <hr></hr>

                <ul className='Tags'>

            
                            <li> 
                                <h4>
                                    no tags for now
                                </h4>
                            </li>
                        ))
                </ul>

                <ul className='Icons'>
                    <li>
                        <a href = {props.CardData.deploymentURL} aria-label="website link" target="_blank">
                            <img src={process.env.PUBLIC_URL + '/Assets/App/Cards/Icons/link.png'} alt="link icon"/> 
                        </a>
                    </li>    
                    <li>
                        <a href = {props.CardData.githubURL} aria-label="github link" target="_blank">
                            <img src={process.env.PUBLIC_URL + '/Assets/App/Cards/Icons/github.svg'} alt="github icon"/> 
                        </a>
                    </li>
                </ul>
            </div>
        </li>
    );
}