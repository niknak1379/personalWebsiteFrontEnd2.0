import { useContext, useEffect, useRef, useState } from "react";
import LoadingPlaceHolder from "../UI/LoadingPlaceHodler";
import LoadingError from "../UI/LoadingError";
import { Form } from "react-router";
import AuthConext from "../Context/authProvider";
import useInterceptorHook from "../Hooks/axiosPrivateInterceptorHook";

export default function NewProjectPage(props) {
    const EditDialogRef = useRef(null)
    const formRef = useRef(null)
    const {baseURL} = useContext(AuthConext)
    const [isLoading, setLoading] = useState(null)
    const [error, setError] = useState(false)
    const axios = useInterceptorHook()

    //form states:
    {/*
            -- DB Fields:
            -- TABLE Projects:
                name varchar(28) NOT NULL,
                description varchar(135) NOT NULL,
                longDescription Text NOT NULL,
                status varchar(255) NOT NULL,
                pictureURL varchar(255),
                githubURL varchar(255),
                deploymentURL varchar(255),
                obsidianURL varchar(255),
                carouselImage_1 varchar(255),
                carouselImage_2 varchar(255),
                carouselImage_3 varchar(255),
            -- TABLE Tags:
                name
                tag
    */}
/*  
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [longDescription, setLongDescription] = useState('')
    const [status, setStatus] = useState('')
    const [githubURL, setGithubURL] = useState('')
    const [deploymentURL, setDeploymentURL] = useState('')
    const [obsidianURL, setObsidianURL] = useState('')
    const [tagsArr, setTagsArr] = useState('')
    const [picture, setPicture] = useState('') //mainPic
    const [carousel1, setCarousel1] = useState('')
    const [carousel2, setCarousel2] = useState('')
    const [carousel3, setCarousel3] = useState('')
 */

    useEffect(() => {
        if (props.DialogStatus){
            console.log('opening bc of state')
            EditDialogRef.current?.showModal()
        }
        if (!props.DialogStatus){
            console.log('closing bc of state')
            EditDialogRef.current?.close()
        }
    }, [props.DialogStatus])

    async function handleSubmit(event){
        event.preventDefault()
        let formData = new FormData(formRef.current)
        //formData.append("originalName", props.CardData.name)
        formData.append("status", "In Progress")
        console.log('submitting')
        try{
            let data = await axios.post(baseURL + '/newProject', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            console.log(data.body)
        }
        catch(error){
            setError(error)
            console.log(error)
        }
    }
    return(
        <dialog ref={EditDialogRef}>

            {/*
            -- DB Fields:
            -- TABLE Projects:
                name varchar(28) NOT NULL,
                description varchar(135) NOT NULL,
                longDescription Text NOT NULL,
                status varchar(255) NOT NULL,
                pictureURL varchar(255),
                githubURL varchar(255),
                deploymentURL varchar(255),
                obsidianURL varchar(255),
                carouselImage_1 varchar(255),
                carouselImage_2 varchar(255),
                carouselImage_3 varchar(255),
            -- TABLE Tags:
                name
                tag
            */}
            {
                isLoading &&
                <span>Loading</span>
            }
            {
                !isLoading && error &&
                <LoadingError />
            }
            {
                !isLoading && !error &&
                <form ref={formRef} className="editProjectForm" onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        Name:
                        <input id="name" name="name" required/>
                    </label>
                    <label htmlFor="description">
                        Description:
                        <input required id="description" name="description"/>
                    </label>
                    <label htmlFor="longDescription">
                        Long Description:
                        <textarea required id="longDescription" name="longDescription"></textarea>
                    </label>
                    <label htmlFor="status">
                        Status:
                        
                        <ul>
                            <li>
                                In Progress
                                <input type="checkbox"/>
                            </li>
                            <li>
                                Has Not Started
                                <input type="checkbox"/>
                            </li>
                            <li>
                                Complete
                                <input type="checkbox"/>
                            </li>
                        </ul>
                    </label>
                    <label htmlFor="githubURL">
                        Github URL:
                        <input required name="githubURL" id="githubURL"/>
                    </label>
                    <label htmlFor="obsidianURL">
                        Obsidian URL:
                        <input required name="obsidianURL" id="githubURL"/>
                    </label>
                    <label htmlFor="deploymentURL">
                        Deployment URL:
                        <input required name="deploymentURL" id="deploymentURL"/>
                    </label>
                    <label htmlFor="tags">
                        Project Tags:
                        
                        <input required name="tags" id="tags" 
                        
                        />
                    </label>
                    <label htmlFor="picture">
                        <input required id='picture' name="pictureURL" type="file" accept="image/avif"></input>
                    </label>
                    <label htmlFor="Carousel1">
                        <input required id="Carousel1" name="carouselImage_1" type="file" accept="image/avif"></input>
                    </label>
                    <label htmlFor="Carousel2">
                        <input required id="Carousel2" name="carouselImage_2" type="file" accept="image/avif"></input>
                    </label>
                    <label htmlFor="Carousel3">
                        <input required id="Carousel3" name="carouselImage_3" type="file" accept="image/avif"></input>
                    </label>
                    <button type="submit" >
                        submit
                    </button>
                </form>
            }
            
            
            <button onClick={() => {
                props.queryFunction()
                console.log('setting to false')
                props.DialogStatusFunc(false)
            }}>close</button>
        </dialog>
    );
}