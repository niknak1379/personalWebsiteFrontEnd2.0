import { useContext, useEffect, useRef, useState } from "react";
import LoadingPlaceHolder from "../UI/LoadingPlaceHodler";
import LoadingError from "../UI/LoadingError";
import { Form } from "react-router";
import AuthConext from "../context/authProvider";
import useInterceptorHook from "../Hooks/axiosPrivateInterceptorHook";

export default function NewProjectPage(props) {
  const controller = new AbortController();
  const EditDialogRef = useRef(null);
  const formRef = useRef(null);
  const { baseURL } = useContext(AuthConext);
  const [isLoading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  const [projData, setData] = useState(null);
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
    if (props.DialogStatus) {
      console.log("opening bc of state");
      EditDialogRef.current?.showModal();
    }
    if (!props.DialogStatus) {
      console.log("closing bc of state");
      EditDialogRef.current?.close();
    }
    return () => controller.abort();
  }, [props.DialogStatus]);

  async function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(formRef.current);

    console.log("submitting");
    try {
      setLoading(true);
      let data = await axios.post(baseURL + "/newProject", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        signal: controller.signal,
      });
      console.log(data.body);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
      if (error == null) {
        window.alert("project added successfully");
        props.DialogStatusFunc(false);
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
				creationDate date,
				lastModified date
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
      {!isLoading && !error && (
        <form ref={formRef} className="editProjectForm" onSubmit={handleSubmit}>
          <div className="dialogWrapper">
            <div className="imgCarousel">
              <img
                ref={pictureRef0}
                className="visible"
                alt="project image 1"
                src={
                  process.env.PUBLIC_URL +
                  "Assets/App/Cards/ProjectPics/placeholder.avif"
                }
              ></img>
              <img
                ref={pictureRef1}
                className=""
                alt="project image 2"
                src={
                  process.env.PUBLIC_URL +
                  "Assets/App/Cards/ProjectPics/placeholder.avif"
                }
              ></img>
              <img
                ref={pictureRef2}
                className=""
                alt="project image 3"
                src={
                  process.env.PUBLIC_URL +
                  "Assets/App/Cards/ProjectPics/placeholder.avif"
                }
              ></img>
              <img
                ref={pictureRef3}
                className=""
                alt="project image 4"
                src={
                  process.env.PUBLIC_URL +
                  "Assets/App/Cards/ProjectPics/placeholder.avif"
                }
              ></img>
              <ul className="imgPreview">
                <li>
                  <img
                    onClick={() => updateCarousel(0)}
                    className="carousel"
                    alt="project image 1"
                    src={
                      process.env.PUBLIC_URL +
                      "Assets/App/Cards/ProjectPics/placeholder.avif"
                    }
                  ></img>
                </li>
                <li>
                  <img
                    onClick={() => updateCarousel(1)}
                    className="carousel"
                    alt="project image 2"
                    src={
                      process.env.PUBLIC_URL +
                      "Assets/App/Cards/ProjectPics/placeholder.avif"
                    }
                  ></img>
                </li>
                <li>
                  <img
                    onClick={() => updateCarousel(2)}
                    className="carousel"
                    alt="project image 3"
                    src={
                      process.env.PUBLIC_URL +
                      "Assets/App/Cards/ProjectPics/placeholder.avif"
                    }
                  ></img>
                </li>
                <li>
                  <img
                    onClick={() => updateCarousel(3)}
                    className="carousel"
                    alt="project image 4"
                    src={
                      process.env.PUBLIC_URL +
                      "Assets/App/Cards/ProjectPics/placeholder.avif"
                    }
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
                    defaultValue={"Project name goes here"}
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
                    defaultValue={"Long Description goes here"}
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
                  defaultValue={"Short description goes here"}
                />
              </label>

              <label htmlFor="tags">
                Project Tags:
                <input
                  required
                  name="tags"
                  id="tags"
                  defaultValue={
                    "Project tags should have a dash(-) separating them"
                  }
                />
              </label>
              <label htmlFor="creationDate">
                Creation Date:
                <input
                  type="date"
                  defaultValue={() => {
                    const today = new Date();
                    const year = today.getFullYear();
                    let month = today.getMonth() + 1;
                    let day = today.getDate();

                    if (month < 10) {
                      month = "0" + month;
                    }
                    if (day < 10) {
                      day = "0" + day;
                    }
                    return `${year}-${month}-${day}`;
                  }}
                  name="creationDate"
                  id="creationDate"
                  required
                ></input>
              </label>
              <label htmlFor="lastModified">
                Last Modified:
                <input
                  type="date"
                  defaultValue={() => {
                    const today = new Date();
                    const year = today.getFullYear();
                    let month = today.getMonth() + 1;
                    let day = today.getDate();

                    if (month < 10) {
                      month = "0" + month;
                    }
                    if (day < 10) {
                      day = "0" + day;
                    }
                    return `${year}-${month}-${day}`;
                  }}
                  name="lastModified"
                  id="lastModified"
                  required
                ></input>
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
                      defaultValue={"Deployment URL goes here"}
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
                      defaultValue={"Github URL goes here"}
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
                      defaultValue={"Obsidiain URL goes here"}
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
