import { useState, useEffect } from 'react';

export function sinWave([millis = 0, waveChara=[1000,1,50,1]] = []) {
  const [wave, setWave]=useState(new Array(waveChara[0]).fill(0));
  const [frame, proceed]=useState(0);
  
  useEffect(() => {
    const newWave=[...wave];
    for(let i=frame;i<Math.floor(millis/1000*waveChara[2]);i++){
      newWave.push(Math.sin(2*Math.PI*waveChara[1]*i/waveChara[2]));
      newWave.shift();
    }
    
    proceed(Math.floor(millis/1000*waveChara[2]));
    setWave(newWave);
  },[millis,frame,waveChara]);
  return wave;
}

export function squareWave([millis = 0, waveChara=[1000,1,50,1]] = []) {
  const [wave, setWave]=useState(new Array(waveChara[0]).fill(0));
  const [frame, proceed]=useState(0);

  useEffect(() => {
    const newWave=[...wave];
    for(let i=frame;i<Math.floor(millis/1000*waveChara[2]);i++){
      newWave.push(Math.pow(-1,Math.round(2*waveChara[1]*i/waveChara[2])%2==0));
      newWave.shift();
    }
    
    proceed(Math.floor(millis/1000*waveChara[2]));
    setWave(newWave);
  },[millis,frame,waveChara]);
  return wave;
}

export function sawtoothWave([millis = 0, waveChara=[1000,1,50,1]] = []) {
  const [wave, setWave]=useState(new Array(waveChara[0]).fill(0));
  const [frame, proceed]=useState(0);

  useEffect(() => {
    const newWave=[...wave];
    for(let i=frame;i<Math.floor(millis/1000*waveChara[2]);i++){
      newWave.push(2*(i*waveChara[1]%waveChara[2])/waveChara[2]-1);
      newWave.shift();
    }
    
    proceed(Math.floor(millis/1000*waveChara[2]));
    setWave(newWave);
  },[millis,frame,waveChara]);
  return wave;
}