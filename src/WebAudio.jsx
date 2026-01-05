import { useEffect, useRef, useState } from 'react';

export function WebAudio(){
    React.useEffect(() => {
        var constraints = { audio: true, video: false }; 
        navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
            var audio = document.querySelector('audio');
            audio.srcObject = mediaStream;
            audio.onloadedmetadata = function(e) {
                audio.play.catch();
            };
        })
        .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
    });
    return(
        <>
            <audio autoplay></audio>
        </>
    );
}

export function getAudioData(){
    const context=new AudioContext();
    const audioElement = document.querySelector('audio');
    const source=context.createMediaStreamSource(audioElement);
    const processor=context.createScriptProcessor(4096, 1, 1);
    const chunks=50;
    const audioData=[];

    processor.onaudioprocess=(e)=>{
        const input=e.inputBuffer.getChannelData(0);
        audioData.push(new Float32Array(input));
        if (audioData.length > chunks){
            audioData.shift();
        }
    };
    return flattenArray(audioData);
}
