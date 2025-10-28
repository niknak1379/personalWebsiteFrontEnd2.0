import "../App.css";
import ProjectCard from "../UI/ProjectCard";
import Gallery from "../UI/Gallery";
import LoadingError from "../UI/LoadingError";
import fetch from "node-fetch";
import { useEffect, useState, useRef } from "react";
import userEvent from "@testing-library/user-event";

/**
 * Component Description: Displays the past and current projects on the website
 *
 * @component
 * @returns {JSX.Element} react component with interactable gallery of projects
 */
export default function Home() {
	const [completedProjects, setcompletedProjects] = useState([]);
	const [incompletedProjects, setincompletedProjects] = useState([]);
	//const [gettingProjects, setGettingProjects] = useState(false);
	const [projectError, setProjectError] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const h1Ref = useRef(null);
	useEffect(() => {
		//expected data structure from the server side getProjects API
		/*
    { 
      {
        "name": "nik",
        "description": "longs d fs sdj ds ",
        "status": "Complete",
        "pictureURL": "pic url",
        "githubURL": "git url",
        "deploymentURL": "dep url",
        "tag": "ALL"
      }
    */

		async function getData() {
			setLoading(true);
			try {
				let complete_data = await fetch(
					"https://api.nikanostovan.dev/ /Complete/ /4"
				);
				let comp = await complete_data.json();
				let incomp_data = await fetch(
					"https://api.nikanostovan.dev/ /In Progress-To Be Started/ /4"
				);
				let incomp = await incomp_data.json();
				setcompletedProjects(comp);
				setincompletedProjects(incomp);
			} catch (error) {
				setProjectError(true);
			} finally {
				setLoading(false);
			}
		}

		getData();

		animate();
	}, []);

	let i = 0;
	let started = false;
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();
	let interval = null;

	/*
	 * animates the H1 header tag with a cool typewriter animation
	 */
	function animate() {
		let introText = h1Ref.current;

		started = true;
		introText.innerHTML = "Hi! I'm Nikan!!";
		typingAdvanced(introText);
		i = 0;
		window.addEventListener("scroll", () => {
			if (isInViewport(introText) && !started) {
				started = true;
				typingAdvanced(introText);
			}
			if (!isInViewport(introText)) {
				started = false;
				i = 0;
			}
		});
	}
	/*
	 * detects when the h1 tag is in the view port.
	 * used to knowing when to re run the animation
	 */
	function isInViewport(element) {
		var rect = element.getBoundingClientRect();
		var html = document.documentElement;
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || html.clientHeight) &&
			rect.right <= (window.innerWidth || html.clientWidth)
		);
	}
	/*
	 * the typewriter logic is in here, using intervals.
	 */
	function typingAdvanced(targetElement) {
		let iteration = 0;
		console.log("hi");
		clearInterval(interval);

		interval = setInterval(() => {
			targetElement.innerText = targetElement.innerText
				.split("")
				.map((letter, index) => {
					if (index < iteration) {
						return targetElement.dataset.value[index];
					}

					return letters[Math.floor(Math.random() * 26)];
				})
				.join("");

			if (iteration >= targetElement.dataset.value.length) {
				clearInterval(interval);
			}

			iteration += 1 / 3;
		}, 30);
	}

	return (
		<div className="Home Background">
			<section id="introduction">
				<section className="hero">
					<div className="heroImgWrapper">
						<img
							className="heroSVG"
							src={process.env.PUBLIC_URL + `/Assets/Main/1.svg`}
							alt="background svg"
						></img>
						<img
							className="heroImg"
							src={process.env.PUBLIC_URL + "/Assets/Main/hero.png"}
							alt="nikan's image"
						></img>
					</div>
					<div className="heroText">
						<h1
							ref={h1Ref}
							id="heroHeader"
							data-value="Hi! I'm Nikan!!"
							aria-valuetext="Hi! I'm Nikan!!"
						>
							s
						</h1>
						<p id="heroText">
							Just a recently graduated student trying his best at
							web-development and design
						</p>
					</div>
				</section>

				<h2 id="Skillset">Skillset</h2>
				<h3 id="SkillsetExplanation">
					Diverse set of skills usefull for web-development
				</h3>

				<table>
					<tbody>
						<tr>
							<th>Web Development</th>
							<td>React, Tailwind, CSS, JS</td>
						</tr>
						<tr>
							<th>Backend</th>
							<td>Node, NextJS, TypeScript</td>
						</tr>
						<tr>
							<th>DevOps</th>
							<td>Distributed Systems Design, Kubernetes, Docker</td>
						</tr>
					</tbody>
				</table>
			</section>
			{/* past projects to be displayed */}
			<section id="pastProjects">
				<h2>Past Projects</h2>
				{isLoading && (
					<Gallery
						projects={[]}
						isLoading={true}
						error={projectError}
						parent="past"
					/>
				)}
				{!isLoading && (
					<Gallery
						projects={completedProjects}
						error={projectError}
						isLoading={false}
						parent="past"
					/>
				)}
			</section>

			{/* current projects to be displayed */}
			<section id="currentProjects">
				<h2>Current Projects</h2>
				{isLoading && (
					<Gallery
						projects={[]}
						isLoading={isLoading}
						error={projectError}
						parent="current"
					/>
				)}
				{!isLoading && (
					<Gallery
						projects={incompletedProjects}
						error={projectError}
						isLoading={isLoading}
						parent="current"
					/>
				)}
			</section>
		</div>
	);
}
