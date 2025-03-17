import { click } from '@testing-library/user-event/dist/click';
import ProjectCard  from './ProjectCard';
import React, { useState, useRef, useEffect } from 'react';
import LoadingPlaceHolder from './LoadingPlaceHodler';


/**
 * Component Description: takes in a list of jsons as a prop and displays the 
 *                        cards created with that data, has buttons and a
 *                        scroll bar to move between the cards
 *
 * @component
 * @param {Object} props                    - Component props
 * @param {Object} props.projects           - list of JSON project data passed on from App
 * @returns {JSX.Element}                   - A React Node displaying a single gallery of projects
 */
export default function Gallery (props) {
    let projects = props.projects;          //projects
    const startX = useRef(0);               //mouse position when mouse down event 
                                            //triggered
    const thumbPosiRef = useRef(0);         //scroll-wheel thumb position when mouse down 
                                            //event triggered

    const isMouseDownRef = useRef(false);   //ref indicating if mouse is still down
    const listRef = useRef(null);           //reference to the list tag containing the projects
    const leftButtonRef = useRef(null);     //left button controlling the list
    const rightButtonRef = useRef(null);    //right button controlling the list
    const thumbRef = useRef(null);          //thumb of the scroll wheel
    const sliderRef = useRef(null);         //scroll wheel slider

    const isTouchRef = useRef(0);

    
    /**
     * terminates the mousemove eventListener after mouseUp has happened
     *
     * @function
     * @returns {string} removes the mouseup evenListener after the clean up function
     *                   has ran
     */
    useEffect(() => {

        /**
         * sets the isMouseDownref to false after mouseUp has been triggered
         * and changes the style of the cursor and terminates the mousemove eventListerner
         *
         * @function
         */
        function handleMove(e) {
          console.log('should default the cursor')
          isMouseDownRef.current = false;
          console.log(isMouseDownRef.current)
          document.body.removeEventListener('mousemove', ScrollUsingThumb);
          document.body.removeEventListener('touchmove', ScrollUsingThumb);
          document.body.style.cursor = "default";
        }
        function changeListWidth(e){
            const scrollbarWidth = window.innerWidth - document.body.clientWidth;
            //console.log(scrollbarWidth, window.innerWidth, document.body.clientWidth);
            document.body.style.setProperty("--scrollbarWidth", `${scrollbarWidth}px`);
        }
        document.body.addEventListener('mouseup', handleMove);
        document.body.addEventListener('touchend', handleMove);
        window.addEventListener('load', changeListWidth);
        window.addEventListener('resize', changeListWidth);
        

        return () => {
      
            document.body.removeEventListener('mouseup', handleMove);
            document.body.removeEventListener('touchend', handleMove);
            window.removeEventListener('load', changeListWidth);
            window.removeEventListener('resize', changeListWidth);
        };
    }, []);

    /**
     * is triggered after mousedown has happened and initiates 
     * scrolling the list of ProjectCards upon mousemove event
     *
     * @function
     * @param {event} [e] - takes in the mousedown event passed onto the function
     */
    const scrollMouseDown = (e) => {
        //e.preventDefault();
        let thumb = thumbRef.current;

        //set mosue ref, mouse starting position and thumb position

        if (isTouchRef.current == true) {
            e = e.touches[0];
        }
      
        isMouseDownRef.current = true;
        startX.current = e.clientX;
        thumbPosiRef.current = thumb.offsetLeft;

      

        document.body.addEventListener("mousemove", ScrollUsingThumb);
        document.body.addEventListener('touchmove', ScrollUsingThumb, {passive: false});
    }


    /**
     * scrolls the list component after being called by the mousemove event
     *
     * @function
     * @param {event} [e] - mousemove event
     */
    const ScrollUsingThumb = (e) => {
        e.preventDefault();
    

        //initializes the references
        let thumb = thumbRef.current;
        let slider = sliderRef.current;
        let projList = listRef.current;

        if (isTouchRef.current == true) {
            e = e.touches[0];
        }
        //e.preventDefault();

        //console.log(e.clientX);
        
        //max pixels the thumb is able to move
        let maxThumbPosi = slider.getBoundingClientRect().width - thumb.offsetWidth;
        //console.log(maxThumbPosi)

        //max amount the list is able to be scrolled
        let maxScroll = projList.scrollWidth - projList.clientWidth - 10;

        
        //if mouse down update the position of the thumb and the list
        if (isMouseDownRef.current) {
            document.body.style.cursor = "grabbing";
            //pxs the mosue has moved
            let deltaX = e.clientX - startX.current;

            //new thumb positions, considering the max amount the thumb can move
            let newThumbPosi = thumbPosiRef.current + deltaX;
            let boundedPosi = Math.max(0, Math.min(maxThumbPosi, newThumbPosi));

            //amount the list will scroll
            let scrollPosi = (boundedPosi/maxThumbPosi) * maxScroll;
            //console.log(scrollPosi, newThumbPosi)

            //change positions of thumb and list
            thumb.style.left = `${boundedPosi}px`;
            projList.scrollLeft = scrollPosi;

            thumb.setAttribute('aria-valuenow', scrollPosi/maxScroll * 100);
        }
    }

    /**
     * happens only when the scroll event is triggered on the list event
     * disables left and right buttons when the list has reached either end
     * of the screen and updates the position of the scroll thumb
     *
     * @function
     * @param {event} [e] - takes in the scroll event
     */
    const DisableButtonOnScrollUpdateThumb = (e) => {

        //initializes the references 
        let rightButton = rightButtonRef.current;
        let leftButton = leftButtonRef.current;
        let thumb = thumbRef.current;
        let slider = sliderRef.current;
        let projList = listRef.current;

        // max amount the list will scroll
        let maxScroll = projList.scrollWidth - projList.clientWidth - 10;
        let maxThumbPosi = slider.getBoundingClientRect().width - thumb.offsetWidth;

        //distance of list from the left
        let scrollPosi = projList.scrollLeft;
        
        //calculate the position of the thumb based of amount scrolled and update style
        let thumbPosi = Math.min((scrollPosi/maxScroll) * (slider.clientWidth - thumb.offsetWidth), maxThumbPosi);
        thumb.style.left = `${thumbPosi}px`;
        thumb.setAttribute('aria-valuenow', scrollPosi/maxScroll * 100);

        /*disable and enable the forward and back buttons*/
        if (scrollPosi == 0) {
            leftButton.classList.add("disabled");
        }
        else {
            leftButton.classList.remove("disabled");
        }
        if (maxScroll <= scrollPosi) {
            rightButton.classList.add("disabled");
        }
        else {
            rightButton.classList.remove("disabled");
        }
    }

    /**
     * only happens after the click event on one of the buttons is triggered
     * changes the amount the list is scrolled by pressing the button
     *
     * @function
     * @param {event} [e] - the click event
     */
    const ScrollByButton = (e) => {

        //initializes the direction, button and list variables
        let direction = 0;
        let button = e.target.parentElement; //had to get the parent since it returns the img tag
        let projList = listRef.current;

        //returns if button is already disabled
        if(button.classList.contains("disabled")){
            return;
        }

        //sets direction of scroll
        if (button.className == 'leftNavButton') {
            direction = -1;
        }
        else {
            direction = 1;
        }
        
        //amount to be scrolled by
        let scrollWidth = projList.getBoundingClientRect().width * direction;
        projList.scrollBy({left:scrollWidth, behavior: "smooth"});

        e.preventDefault();
    }
    console.log(props.isLoading)



    return (
        <div className="Gallery">
            <button className='leftNavButton' onClick={ScrollByButton} ref={leftButtonRef} aria-label='scroll left'>
                <img src={process.env.PUBLIC_URL + '/Assets/App/Gallery/backButton.png'} 
                    alt='left Navigation Button' className='buttonBackground'/> 
            </button>

            <ul className='cardList' onScroll={DisableButtonOnScrollUpdateThumb} ref={listRef}>
                {!props.isLoading && projects.map(item => (
                    <ProjectCard key={item.name} CardData = {item} />
                ))}
                {props.isLoading && [0,1,2].map(i => (
                    <LoadingPlaceHolder key={i}/>
                ))}
            </ul>
                 
            <button className='rightNavButton' onClick={ScrollByButton} ref={rightButtonRef} aria-label='scroll right'>
                <img src={process.env.PUBLIC_URL + '/Assets/App/Gallery/forwardButton.png'} 
                    alt='right Navigation Button' className='buttonBackground'/> 
            </button>

            {/* scroll bar used to scroll the list container */}
            <div className='ScrollBar'>
                <div className='ScrollTrack' ref={sliderRef}>
                    <div className='ScrollThumb' aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} role='scrollbar' ref={thumbRef}
                        onMouseDown={(e) => {
                            isTouchRef.current = false;
                            scrollMouseDown(e);}}

                        onTouchStart={(e) => {
                            isTouchRef.current = true;
                            scrollMouseDown(e);}}>
                    </div>
                </div>
            </div>
        </div>
    );
}