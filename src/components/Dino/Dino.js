import React,{useEffect,useRef,useState} from "react";
import "./Dino.css"

function Dino(){
    //ref to get 'dino' html element in js
    const dinoref=useRef();
    //ref to get cactus html element in js
    const cactusref = useRef();
    const [score,setScore]=useState(0);

    //method to add 'jump' class every '300ms' as the class jump css has jumping animation of 0.3s(300ms).
  //so on each key press we need to add animation and remove animation
  const jump = ()=>{
    if(!!dinoref.current && dinoref.current.classList !== "jump"){
        dinoref.current.classList.add("jump");
        setTimeout(function (){
            dinoref.current.classList.remove("jump");
        },300)
    }
  }
    
   //useEffect to track whether dino position and cactus position is intersecting
  //if yes, then game over.
  useEffect(() =>{
    const isAlive = setInterval(function (){


          // get current dino Y position
          const dinoTop = parseInt(
            getComputedStyle(dinoref.current).getPropertyValue("top")
          );
          // get current cactus X position
          let cactusLeft = parseInt(
            getComputedStyle(cactusref.current).getPropertyValue("left")
          );
          
          //detect cactus collision
          if(cactusLeft <40 && cactusLeft > 0 && dinoTop >=140){
            //collision
            alert('Game Over! Your Score : ' +score);
            setScore(0);
          }else{
            setScore(score + 1);
          }
    },10);
    return()=>clearInterval(isAlive);//clean up interval on component unmount
  })

  useEffect(()=>{
    document.addEventListener("keydown",jump);
    return()=>document.removeEventListener("keydown",jump);
  },[]);
  return(
    <div className="game">
      score : {score}
      <div id="dino" ref={dinoref}></div>
      <div id="cactus" ref={cactusref}></div>
    </div>
  );
}

export default Dino;