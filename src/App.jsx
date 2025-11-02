import {useState,useEffect} from "react";
import Papa from "papaparse";

export default function App() {
  const pics=[
    {src:"images/pic1.jpg",alt:"Closeup of a human eye"},
    {src:"images/pic2.jpg",alt:"Rock that looks like a wave"},
    {src:"images/pic3.jpg",alt:"Purple and white pansies"},
    {src:"images/pic4.jpg",alt:"Section of wall from a pharoah`s tomb"},
    {src:"images/pic5.jpg",alt:"Large moth on a leaf"}
  ];
  const [pic0,setpic]=useState(pics[0]);
  const [dark,setdarkness]=useState(false);

  return (
    <>
      <h1>Image gallery example</h1>
      <div className="full-img">
        <img
          className="displayed-img"
          src={pic0.src}
          alt={pic0.alt}
        />
        <div
          className="overlay"
          style={{backgroundColor: dark?"rgba(0,0,0,0.5)":"rgba(0,0,0,0)"}}
        />
        <button
          className="dark"
          onClick={()=>setdarkness(!dark)}
        >
          {dark ? "Brigten":"Darken"}
        </button>
      </div>
      
      <div className="thumb-bar">
        {pics.map((pic)=>{
          return(
            <img src={pic.src} alt={pic.alt}
            onClick={()=>setpic(pic)}
            />
          );
        })}
      </div>
    </>
  );
}