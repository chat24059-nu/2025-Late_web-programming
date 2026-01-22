import { useEffect, useRef, useState } from 'react';

export function useMicWave(bufsize){
    const [waveform, setWaveform]=useState(new Float32Array(bufsize));
    const audioContextRef=useRef(null);
    const analyserRef=useRef(null);
    const dataArrayRef=useRef(null);
    const rafIdRef=useRef(null);

    useEffect(() => {
        const init=async()=>{
            const stream=await navigator.mediaDevices.getUserMedia({audio:true});
            audioContextRef.current=new (window.AudioContext||window.webkitAudioContext)();
            analyserRef.current=audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize=2*bufsize;

            dataArrayRef.current=new Float32Array(analyserRef.current.fftSize);
            const source=audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);

            const update=() => {
                analyserRef.current.getFloatTimeDomainData(dataArrayRef.current);
                const latest=dataArrayRef.current.slice(-bufsize);
                setWaveform(new Float32Array(latest));
                rafIdRef.current=requestAnimationFrame(update);
            };
            update();
        };
        init();
        return ()=>{
            if(rafIdRef.current){
                cancelAnimationFrame(rafIdRef.current);
            }
            if(audioContextRef.current){
                audioContextRef.current.close();
            }
        };
    },[bufsize]);
    return waveform;
}