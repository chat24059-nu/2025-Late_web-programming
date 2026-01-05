import { useState, useEffect } from 'react';

function mute([millis,waveChara]){
  const [wave, setWave]=useState(new Array(waveChara[0]).fill(0));
  const [frame, proceed]=useState(0);
  
  useEffect(() => {
    const newWave=[...wave];
    for(let i=frame;i<Math.floor(millis/1000*waveChara[2]);i++){
      newWave.push(0);
      newWave.shift();
    }
    
    proceed(Math.floor(millis/1000*waveChara[2]));
    setWave(newWave);
  },[millis,frame,waveChara]);
  return wave;
}

function sinWave([millis,waveChara]){
  const [wave, setWave]=useState(new Array(waveChara[0]).fill(0));
  const [frame, proceed]=useState(0);
  let vol=Math.pow(10,waveChara[3]/20);
  
  useEffect(() => {
    const newWave=[...wave];
    for(let i=frame;i<Math.floor(millis/1000*waveChara[2]);i++){
      newWave.push(Math.min(vol*Math.sin(2*Math.PI*waveChara[1]*i/waveChara[2]),1));
      newWave.shift();
    }
    
    proceed(Math.floor(millis/1000*waveChara[2]));
    setWave(newWave);
  },[millis,frame,waveChara]);
  return wave;
}

function squareWave([millis,waveChara]) {
  const [wave, setWave]=useState(new Array(waveChara[0]).fill(0));
  const [frame, proceed]=useState(0);
  let vol=Math.min(Math.pow(10,waveChara[3]/20),1);

  useEffect(() => {
    const newWave=[...wave];
    for(let i=frame;i<Math.floor(millis/1000*waveChara[2]);i++){
      newWave.push(vol*Math.pow(-1,Math.round(2*waveChara[1]*i/waveChara[2])%2==0));
      newWave.shift();
    }
    
    proceed(Math.floor(millis/1000*waveChara[2]));
    setWave(newWave);
  },[millis,frame,waveChara]);
  return wave;
}

function sawtoothWave([millis,waveChara]) {
  const [wave, setWave]=useState(new Array(waveChara[0]).fill(0));
  const [frame, proceed]=useState(0);
  let vol=Math.pow(10,waveChara[3]/20);

  useEffect(() => {
    const newWave=[...wave];
    for(let i=frame;i<Math.floor(millis/1000*waveChara[2]);i++){
      newWave.push(Math.min(vol*(2*(i*waveChara[1]%waveChara[2])/waveChara[2]-1),1));
      newWave.shift();
    }
    
    proceed(Math.floor(millis/1000*waveChara[2]));
    setWave(newWave);
  },[millis,frame,waveChara]);
  return wave;
}

export function generate([millis,waveChara]){
  if(waveChara[4]=="Mute"){
    return mute([millis,waveChara]);
  }else if(waveChara[4]=="Sin"){
    return sinWave([millis,waveChara]);
  }else if(waveChara[4]=="Square"){
    return squareWave([millis,waveChara]);
  }else if(waveChara[4]=="Saw"){
    return sawtoothWave([millis,waveChara]);
  }
}