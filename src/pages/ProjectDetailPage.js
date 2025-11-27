import { useState, useRef, useEffect, useContext } from "react";
import "./projectDetailPage.css";
import LoadingError from "../UI/LoadingError";
import {} from "../utils/CDN_handler";
import AuthConext from "../context/authProvider";
export default function ProjectDetailPage(props) {
  const [isLoading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  const [projData, setData] = useState(null);
  const [visibleCarouselImg, setVisibleCarouselImg] = useState(0);
  const pictureRef0 = useRef(null);
  const pictureRef1 = useRef(null);
  const pictureRef2 = useRef(null);
  const pictureRef3 = useRef(null);
  const parRef = useRef(null);
  const carouselArr = [pictureRef0, pictureRef1, pictureRef2, pictureRef3];
  const dialogRef = useRef(null);
  const { baseURL } = useContext(AuthConext);
  useEffect(() => {
    async function getProjectDetails() {
      setError(false);
      setLoading(true);
      try {
        let data = await fetch(
          baseURL + "/projectDetails/" + props.CardData.name
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
      console.log("opening bc of state");
      dialogRef.current?.showModal();
      getProjectDetails();
    }
    if (!props.DialogStatus) {
      console.log("closing bc of state");
      dialogRef.current?.close();
    }
  }, [props.DialogStatus]);
  useEffect(() => {
    console.log(projData);
    if (projData != null)
      parRef.current.innerHTML = projData.longDescription.replaceAll(
        "\r\n",
        "<br></br>"
      );
  }, [projData]);

  function updateCarousel(i) {
    carouselArr[visibleCarouselImg].current.classList.remove("visible");
    carouselArr[i].current.classList.add("visible");
    setVisibleCarouselImg(i);
    console.log(visibleCarouselImg, i);
  }

  return (
    <dialog className="projectDetailPage" ref={dialogRef}>
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

      {isLoading && (
        <div className="dialogWrapper placeHolder">
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
            <h1>{props.CardData.name}</h1>
            <span>
              <h2>{props.CardData.status}</h2>
            </span>
            <p className="projDetailLoading">
              sss<br></br>
              <br></br>
              <br></br>
              <br></br>
            </p>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="tagAndLinkWrapper">
          <span>Project Tags:</span>
          <ul className="tagsList">
            <li>
              <div className="sidebarLoading">
                Loading{" "}
                <span>
                  <span></span>
                </span>
              </div>
            </li>
          </ul>
          <span>Additional Links:</span>
          <ul className="linksList">
            <li>
              Deployment URL:{" "}
              <a target="_blank" href="">
                <div className="sidebarLoading">
                  <span>
                    <span></span>
                  </span>
                </div>
              </a>
            </li>
            <li>
              Repository:{" "}
              <a target="_blank" href="">
                <div className="sidebarLoading">
                  <span>
                    <span></span>
                  </span>
                </div>
              </a>
            </li>
            <li>
              Notes and Documentation: &nbsp; &nbsp;{" "}
              <a target="_blank" href="">
                <div className="sidebarLoading">
                  <span>
                    <span></span>
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      )}
      {!isLoading && !error && projData != null && (
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
            <h1>{props.CardData.name}</h1>
            <span>
              <h2>{projData.status}</h2>
            </span>
            <p ref={parRef}></p>
          </div>
        </div>
      )}
      {!isLoading && !error && projData != null && (
        <div className="tagAndLinkWrapper">
          <span>Project Tags:</span>
          <ul className="tagsList">
            {projData.tags.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
          <span className="projDate">
            Creation Date: <span>{projData.creationDate}</span>
          </span>
          <span className="projDate">
            Last Modified: <span>{projData.lastModified}</span>
          </span>
          <span>Additional Links:</span>
          <ul className="linksList">
            <li>
              <span>Deployment URL:</span>{" "}
              <a target="_blank" href={props.CardData.deploymentURL}>
                <img
                  src={
                    process.env.PUBLIC_URL + "/Assets/App/Cards/Icons/link.png"
                  }
                ></img>
              </a>
            </li>
            <li>
              Repository:{" "}
              <a target="_blank" href={props.CardData.githubURL}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/App/Cards/Icons/github.svg"
                  }
                ></img>
              </a>
            </li>
            <li>
              Notes and Documentation: &nbsp; &nbsp;{" "}
              <a target="_blank" href={projData.obsidianURL}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/Assets/App/Cards/Icons/obsidian.svg"
                  }
                ></img>
              </a>
            </li>
          </ul>
        </div>
      )}
      {error && <LoadingError />}
    </dialog>
  );
}
