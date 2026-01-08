import {useState,useEffect,useRef} from 'react';

export function generate(millis,waveChara){
  const [frame, proceed]=useState(0);
  const [wave, setWave]=useState(new Array(waveChara[0]).fill(0));
  let vol=Math.pow(10,waveChara[3]/20);
  const waveForm=(i)=>{
    switch(waveChara[4]){
      case "Sin":
        return Math.min(vol*Math.sin((2*Math.PI* waveChara[1]*i)/waveChara[2]),1);
      case "Square":
        return vol*(Math.round((2*waveChara[1]*i)/waveChara[2])%2===0?1:-1);
      case "Saw":
        return Math.min(vol*(2*((i*waveChara[1])%waveChara[2])/waveChara[2]-1),1);
      default:
        return 0;
  }};
  useEffect(() => {
    const startFrame=Math.min(frame,millis/1000*waveChara[2]-wave.length);
    const targetFrame=Math.floor(millis/1000*waveChara[2]);
    const newWave=[...wave];
    for(let i=startFrame;i<targetFrame;i++){
      newWave.push(waveForm(i));
    }
    while(newWave.length>waveChara[0]){
      newWave.shift();
    }
    proceed(targetFrame);
    setWave(newWave);
  },[millis]);
  return wave;
}