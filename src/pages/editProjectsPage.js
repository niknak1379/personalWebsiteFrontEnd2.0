import { useContext, useEffect, useRef, useState } from "react";
import LoadingPlaceHolder from "../UI/LoadingPlaceHodler";
import LoadingError from "../UI/LoadingError";
import { Form } from "react-router";
import AuthConext from "../context/authProvider";
import useInterceptorHook from "../Hooks/axiosPrivateInterceptorHook";

export default function ProjectEditPage(props) {
	const Controller = new AbortController();
	const EditDialogRef = useRef(null);
	const formRef = useRef(null);
	const { baseURL } = useContext(AuthConext);
	const [isLoading, setLoading] = useState(null);
	const [error, setError] = useState(false);
	const [projData, setData] = useState(null);
	const [refresh, setRefresh] = useState(0);
	const axios = useInterceptorHook();
	const [visibleCarouselImg, setVisibleCarouselImg] = useState(0);
	const pictureRef0 = useRef(null);
	const pictureRef1 = useRef(null);
	const pictureRef2 = useRef(null);
	const pictureRef3 = useRef(null);
	const carouselArr = [pictureRef0, pictureRef1, pictureRef2, pictureRef3];
	function updateCarousel(i) {
		carouselArr[visibleCarouselImg].current.classList.remove("visible");
		carouselArr[i].current.classList.add("visible");
		setVisibleCarouselImg(i);
		console.log(visibleCarouselImg, i);
	}
	//form states:
	{
		/*
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
    */
	}
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
		async function getProjectDetails() {
			setError(false);
			setLoading(true);
			try {
				let data = await fetch(
					"https://api.nikanostovan.dev/projectDetails/" + props.CardData.name,
					{ signal: Controller.abort() }
				);
				let readabledata = await data.json();
				setData(readabledata);
				console.log(readabledata);
			} catch (e) {
				setError(true);
				console.log(e);
			} finally {
				setLoading(false);
			}
		}
		if (props.DialogStatus) {
			console.log("opening bc of state", refresh);
			EditDialogRef.current?.showModal();
			getProjectDetails();
		}
		if (!props.DialogStatus) {
			console.log("closing bc of state");
			EditDialogRef.current?.close();
		}
		return () => Controller.abort();
	}, [props.DialogStatus, refresh]);

	async function handleSubmit(event) {
		event.preventDefault();
		let formData = new FormData(formRef.current);
		formData.append("originalName", props.CardData.name);
		console.log("submitting");
		try {
			setLoading(true);
			let data = await axios.put(baseURL + "/editProject", formData, {
				headers: { "Content-Type": "multipart/form-data" },
				signal: Controller.signal,
			});
		} catch (error) {
			setError(error);
			console.log(error);
		} finally {
			setLoading(false);
			if (error == false) {
				window.alert("project edited successfully");
				setRefresh(refresh + 1);
			}
		}
	}
	return (
		<dialog className="projectDetailPage" ref={EditDialogRef}>
			<div className="projectButtonWrapper">
				<span>Nikan.</span>
				<button
					onClick={() => {
						console.log("closing");
						props.DialogStatusFunc(false);
					}}
				>
					X
				</button>
			</div>
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
			{isLoading && (
				<div className="sidebarLoading">
					Loading{" "}
					<span>
						<span></span>
					</span>
				</div>
			)}
			{!isLoading && error && <LoadingError />}
			{projData != null && !isLoading && !error && (
				<form ref={formRef} className="editProjectForm" onSubmit={handleSubmit}>
					<div className="dialogWrapper">
						<div className="imgCarousel">
							<img
								ref={pictureRef0}
								className="visible"
								alt="project image 1"
								src={projData.pictureURL}
							></img>
							<img
								ref={pictureRef1}
								className=""
								alt="project image 2"
								src={projData.carouselImage_1}
							></img>
							<img
								ref={pictureRef2}
								className=""
								alt="project image 3"
								src={projData.carouselImage_2}
							></img>
							<img
								ref={pictureRef3}
								className=""
								alt="project image 4"
								src={projData.carouselImage_3}
							></img>
							<ul className="imgPreview">
								<li>
									<img
										className="carousel"
										alt="loading image"
										src={
											process.env.PUBLIC_URL +
											"Assets/App/Cards/ProjectPics/placeholder.avif"
										}
									></img>
									<img
										onClick={() => updateCarousel(0)}
										className="carousel"
										alt="project image 1"
										src={projData.pictureURL}
									></img>
								</li>
								<li>
									<img
										className="carousel"
										alt="loading image"
										src={
											process.env.PUBLIC_URL +
											"Assets/App/Cards/ProjectPics/placeholder.avif"
										}
									></img>
									<img
										onClick={() => updateCarousel(1)}
										className="carousel"
										alt="project image 2"
										src={projData.carouselImage_1}
									></img>
								</li>
								<li>
									<img
										className="carousel"
										alt="loading image"
										src={
											process.env.PUBLIC_URL +
											"Assets/App/Cards/ProjectPics/placeholder.avif"
										}
									></img>
									<img
										onClick={() => updateCarousel(2)}
										className="carousel"
										alt="project image 3"
										src={projData.carouselImage_2}
									></img>
								</li>
								<li>
									<img
										className="carousel"
										alt="loading image"
										src={
											process.env.PUBLIC_URL +
											"Assets/App/Cards/ProjectPics/placeholder.avif"
										}
									></img>
									<img
										onClick={() => updateCarousel(3)}
										className="carousel"
										alt="project image 4"
										src={projData.carouselImage_3}
									></img>
								</li>
							</ul>
						</div>
						<div className="textDetails">
							<h1>
								<label htmlFor="name">
									<span>Project Name:</span>
									<input
										id="name"
										name="name"
										required
										defaultValue={props.CardData.name}
									/>
								</label>
							</h1>

							<h2>
								Status:
								<ul>
									<li>
										<input
											id="In Progress"
											name="status"
											type="radio"
											value="In Progress"
										/>
										<label htmlFor="In Progress">In Progress</label>
									</li>
									<li>
										<input
											id="To Be Started"
											name="status"
											type="radio"
											value="To Be Started"
										/>
										<label htmlFor="To Be Started">To Be Started</label>
									</li>
									<li>
										<input
											id="Complete"
											name="status"
											type="radio"
											value="Complete"
										/>
										<label htmlFor="Complete">Complete</label>
									</li>
								</ul>
							</h2>

							<p>
								<label htmlFor="longDescription">
									Long Description:
									<textarea
										required
										id="longDescription"
										name="longDescription"
										defaultValue={projData.longDescription}
									></textarea>
								</label>
							</p>
						</div>
					</div>
					<div className="tagAndLinkWrapper">
						<div className="TagLinkInputWrapper">
							<label htmlFor="description">
								Short Description:
								<textarea
									required
									id="description"
									name="description"
									defaultValue={projData.description}
								/>
							</label>

							<label htmlFor="tags">
								Project Tags:
								<input
									required
									name="tags"
									id="tags"
									defaultValue={projData.tags.join("-")}
								/>
							</label>
							<span>Additional Links:</span>
							<ul className="linksList">
								<li>
									<label htmlFor="deploymentURL">
										<span>Deployment URL:</span>
										<input
											required
											name="deploymentURL"
											id="deploymentURL"
											defaultValue={props.CardData.deploymentURL}
										/>
									</label>
								</li>
								<li>
									<label htmlFor="githubURL">
										<span>Repository:</span>
										<input
											required
											name="githubURL"
											id="githubURL"
											defaultValue={props.CardData.githubURL}
										/>
									</label>
								</li>
								<li>
									<label htmlFor="obsidianURL">
										<span>Documentation:</span>
										<input
											required
											name="obsidianURL"
											id="obsidianURL"
											defaultValue={projData.obsidianURL}
										/>
									</label>
								</li>
							</ul>
						</div>

						<div className="fileUploadWrapper">
							<label
								htmlFor="picture"
								onMouseOver={(e) => {
									console.log("running on mouseover");
									updateCarousel(0);
									pictureRef0.current.classList.add("animate");
								}}
								onMouseLeave={(e) => {
									console.log("running mouseout");
									pictureRef0.current.classList.remove("animate");
								}}
							>
								Main Picture:
								<input
									id="picture"
									name="pictureURL"
									type="file"
									accept="image/avif"
								></input>
							</label>
							<label
								htmlFor="Carousel1"
								onMouseOver={(e) => {
									console.log("running on mouseover");
									updateCarousel(1);
									pictureRef1.current.classList.add("animate");
								}}
								onMouseLeave={(e) => {
									console.log("running mouseout");
									pictureRef1.current.classList.remove("animate");
								}}
							>
								Second Picture:
								<input
									id="Carousel1"
									name="carouselImage_1"
									type="file"
									accept="image/avif"
								></input>
							</label>
							<label
								htmlFor="Carousel2"
								onMouseOver={(e) => {
									console.log("running on mouseover");
									updateCarousel(2);
									pictureRef2.current.classList.add("animate");
								}}
								onMouseLeave={(e) => {
									console.log("running mouseout");
									pictureRef2.current.classList.remove("animate");
								}}
							>
								Third Picture:
								<input
									id="Carousel2"
									name="carouselImage_2"
									type="file"
									accept="image/avif"
								></input>
							</label>
							<label
								htmlFor="Carousel3"
								onMouseOver={(e) => {
									console.log("running on mouseover");
									updateCarousel(3);
									pictureRef3.current.classList.add("animate");
								}}
								onMouseLeave={(e) => {
									console.log("running mouseout");
									pictureRef3.current.classList.remove("animate");
								}}
							>
								Fourth Picture:
								<input
									id="Carousel3"
									name="carouselImage_3"
									type="file"
									accept="image/avif"
								></input>
							</label>
							<span>
								note: if a file is not uploaded the previous uploaded image will
								remain in the database
							</span>
							<button type="submit">Submit</button>
						</div>
					</div>
				</form>
			)}
		</dialog>
	);
}
