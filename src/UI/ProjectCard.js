import { useContext, useRef, useState } from "react";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import AuthConext from "../Context/authProvider";
import useInterceptorHook from "../Hooks/axiosPrivateInterceptorHook";
import LoadingError from "./LoadingError";
import ProjectEditPage from "../pages/editProjectsPage";

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
    const [projecdtDetailPageModal, setProjectDetailPage] = useState(false)
    const [projectEditPageModal, setProjectEditPage] = useState(false)
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(false)
    const {accessToken, baseURL} = useContext(AuthConext)
    const axios = useInterceptorHook()
    const deleteDialogRef = useRef(null)
    async function deleteProject(){
        try{
            setIsLoading(true)
            let data = await axios.delete(baseURL + '/' + props.CardData.name)
            if (data.status == 201){
                return console.log('deleted Successfully')
            }
            else{
                setError(true)
                throw new Error('wrong status code returned, check server logs')
            }
            
        }
        catch(error) {
            setError(true)
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
        
    }
    return (
        <li className="Card">
            {/* edit and delete buttons */}
            {accessToken && <img alt='edit button' className="editButton" 
                src={process.env.PUBLIC_URL + 'Assets/App/Cards/edit.svg'}
                onClick={() => {
                    if(!projectEditPageModal) {
                        setProjectEditPage(true)
                    }}}
            />}
            {accessToken && <img alt='delete button' className="deleteButton" 
                src={process.env.PUBLIC_URL + 'Assets/App/Cards/delete.svg'}
                onClick={() => {
                    deleteDialogRef.current.showModal()
                }}
                />}
            {projecdtDetailPageModal && <ProjectDetailPage DialogStatus={projecdtDetailPageModal}
            DialogStatusFunc={setProjectDetailPage} CardData={props.CardData}/>}

            

            {/* delete dialog */}
            <dialog ref={deleteDialogRef} className="deleteDialog">
                    
                    
                <div className="deleteDialogDiv">
                    <div className="deleteDialogHeader">
                        <button className="closeDeleteDialog" onClick={() => {
                                props.queryFunction()
                                deleteDialogRef.current.close()
                            }}>
                                X
                        </button>
                    </div>

                    {isLoading && <span>Loading...</span>}
                    {(isLoading == null) && 
                    <>
                        <h2>Are You Sure You Want to Delete This Project?</h2>
                        <button className="deleteProjectButton" onClick={deleteProject}>
                            Yes Delete The Project
                        </button>
                    </>}
                    {isLoading != null && !isLoading && !error &&
                        <span>
                            deleted Successfully
                        </span>
                    }
                    {!isLoading && error &&
                        <LoadingError></LoadingError>
                    }
                </div>   
            </dialog>

            {/* default projecet card elements(images, and descriptions) */}
            <img className = "ProjectPicLoader" src={process.env.PUBLIC_URL + 'Assets/App/Cards/ProjectPics/placeholder.avif'} 
                alt = 'Place holder picture'/> 
            <img className = "ProjectPic" src={props.CardData.pictureURL} 
                alt = {props.CardData.name + ' screen shot'}/> 
            <div className='CardTexts'>

                <h3 onClick={() => {
                    if(!projecdtDetailPageModal) {
                        setProjectDetailPage(true)
                    }
                }}>{props.CardData.name}</h3>
                <p>{props.CardData.description}</p>
                
                <hr></hr>

                <div className="cardBottomSection">
                    <h4>
                        {props.CardData.status}
                    </h4>
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
                
            </div>
        </li>
    );
}