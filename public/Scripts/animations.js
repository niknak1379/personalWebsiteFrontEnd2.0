let i = 0;
var txt1 = 'Hi! I\'m Nikan!';
var txt2 = 'Just a recently graduated student trying his best at web-development and design';
var speed = 25;
let started = false;
//let randomTurn = true;
let randomTurn = 0;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();

let interval = null;

let targetElement = document.querySelector("h1");
window.addEventListener('DOMContentLoaded', animate);

function animate() {
    let introText = document.getElementById("heroHeader");
    let introPar = document.getElementById('heroText');
    //console.log('onload, started is true');
    started = true;
    introText.innerHTML = 'Hi! I\'m Nikan!!';
    //typeWriter(introText, txt1);
    typingAdvanced(introText);
    i = 0;
    window.addEventListener('scroll', () => {
        //console.log(started);
        if(isInViewport(introText) && !started) {
            started = true;
            typingAdvanced(introText);
            //introText.innerHTML = '';
            //typeWriter(introText, txt1);
            //console.log('in view, started false');
        }
        /* if (isInViewport(introText) && started){
            //console.log('in view, started is true') 
        } */
        if (!isInViewport(introText)){
            //console.log('not in view, everything is reset') ;
            started = false;
            //introText.innerHTML = 'A';
            i = 0;
        }
    })
}

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

function typeWriter(element, txt) {

    if (i < txt.length) {
        if (randomTurn != 2) {
            const lowercaseAsciiStart = 97;
	        const letterIndex = Math.floor(Math.random() * 26);
	        const letter = String.fromCharCode(lowercaseAsciiStart + letterIndex);
            if (randomTurn == 1) {
                string = document.getElementById("heroHeader").innerHTML;
                element.innerHTML = string.substring(0,string.length-1);
            }
            element.innerHTML += letter;
            //randomTurn = false;
            randomTurn += 1;
        }
        else{
            string = document.getElementById("heroHeader").innerHTML;
        
            element.innerHTML = string.substring(0,string.length-1);
            element.innerHTML += txt.charAt(i);  
            //randomTurn = true;
            randomTurn = 0;
            i++;
            //console.log(txt.charAt(i));
        }
        setTimeout(typeWriter, speed, element, txt);
    }
    else{
        //typingAdvanced(element);
    }
}

function typingAdvanced(targetElement) {  
  let iteration = 0;
  console.log('hi');
  clearInterval(interval);
  
  interval = setInterval(() => {
    targetElement.innerText = targetElement.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return targetElement.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= targetElement.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1/3;
  }, 20);
}


//document.querySelector("h1").onmouseover = typingAdvanced(targetElement);