import {useState,useEffect} from 'react';

export function useGenerate(millis,waveChara){
    const [frame,proceed]=useState(0);
    const [wave,setWave]=useState(new Float32Array(waveChara[0]).fill(0));
    let vol=Math.pow(10,waveChara[3]/20);
    const waveForm=(i)=>{
        switch(waveChara[4]){
            case "Sin":
                return Math.sin((2*Math.PI* waveChara[1]*i)/waveChara[2]);
            case "Square":
                return Math.round((2*waveChara[1]*i)/waveChara[2])%2===0?1:-1;
            case "Saw":
                return 2*((i*waveChara[1])%waveChara[2])/waveChara[2]-1;
            default:
                return 0;
    }};
    useEffect(() => {
        const targetFrame=Math.floor(millis/1000*waveChara[2]);
        if(targetFrame===frame) return;
        const startFrame=Math.max(frame,targetFrame-wave.length);
        const newWave=[...wave];
        for(let i=startFrame;i<targetFrame;i++){
            newWave.push(Math.max(-1,Math.min(1,waveForm(i))));
        }
        while(newWave.length>waveChara[0]){
            newWave.shift();
        }
        proceed(targetFrame);
        setWave(new Float32Array(newWave));
    },[millis]);
    return wave;
}