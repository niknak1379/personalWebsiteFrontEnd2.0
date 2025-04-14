import { useContext, useEffect, useRef, useState } from "react";
import LoadingPlaceHolder from "../UI/LoadingPlaceHodler";
import LoadingError from "../UI/LoadingError";
import { Form } from "react-router";
import AuthConext from "../Context/authProvider";
import useInterceptorHook from "../Hooks/axiosPrivateInterceptorHook";

export default function ProjectEditPage(props) {
    const EditDialogRef = useRef(null)
    const formRef = useRef(null)
    const {baseURL} = useContext(AuthConext)
    const [isLoading, setLoading] = useState(null)
    const [error, setError] = useState(false)
    const [projData, setData] = useState(null)
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
            EditDialogRef.current?.showModal()
            getProjectDetails()
        }
        if (!props.DialogStatus){
            console.log('closing bc of state')
            EditDialogRef.current?.close()
        }
    }, [props.DialogStatus])

    async function handleSubmit(event){
        event.preventDefault()
        let formData = new FormData(formRef.current)
        formData.append("originalName", props.CardData.name)
        formData.append("status", "Complete")
        console.log('submitting')
        try{
            let data = await axios.put(baseURL + '/editProject', formData, {headers: {'Content-Type': 'multipart/form-data'}})
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
                projData != null && !isLoading && !error &&
                <form ref={formRef} className="editProjectForm" onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        Name:
                        <input id="name" name="name" required defaultValue={props.CardData.name}/>
                    </label>
                    <label htmlFor="description">
                        Description:
                        <input required id="description" name="description" defaultValue={props.CardData.description}/>
                    </label>
                    <label htmlFor="longDescription">
                        Long Description:
                        <textarea required id="longDescription" name="longDescription" defaultValue={projData.longDescription}></textarea>
                    </label>
                    <label htmlFor="status">
                        Status:
                        {props.CardData.status}
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
                        <input required name="githubURL" id="githubURL" defaultValue={props.CardData.githubURL}/>
                    </label>
                    <label htmlFor="obsidianURL">
                        Obsidian URL:
                        <input required name="obsidianURL" id="githubURL" defaultValue={projData.obsidianURL}/>
                    </label>
                    <label htmlFor="deploymentURL">
                        Deployment URL:
                        <input required name="deploymentURL" id="deploymentURL" defaultValue={props.CardData.deploymentURL}/>
                    </label>
                    <label htmlFor="tags">
                        Project Tags:
                        {console.log(projData.tags)}
                        <input required name="tags" id="tags" defaultValue={
                            projData.tags.join('-')
                        }
                        />
                    </label>
                    <label htmlFor="picture">
                        <img src={projData.pictureURL}/>
                        <input id='picture' name="pictureURL" type="file" accept="image/avif"></input>
                    </label>
                    <label htmlFor="Carousel1">
                        <img src={projData.carouselImage_1}/>
                        <input id="Carousel1" name="carouselImage_1" type="file" accept="image/avif"></input>
                    </label>
                    <label htmlFor="Carousel2">
                        <img src={projData.carouselImage_2}/>
                        <input id="Carousel2" name="carouselImage_2" type="file" accept="image/avif"></input>
                    </label>
                    <label htmlFor="Carousel3">
                        <img src={projData.carouselImage_3}/>
                        <input id="Carousel3" name="carouselImage_3" type="file" accept="image/avif"></input>
                    </label>
                    <button type="submit" >
                        submit
                    </button>
                </form>
            }
            
            
            <button onClick={() => {
                props.queryFunction()
                props.DialogStatusFunc(false)
            }}>close</button>
        </dialog>
    );
}