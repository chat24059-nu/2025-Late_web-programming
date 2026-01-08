import {useState,useEffect} from 'react'
import DrawInput from "./inputSource";
import DrawWave from "./drawWave";
import WaveCharaDisplay from "./WaveCharaDisplay"
import {generate} from "./generateWave";
import AnalyseFrequency from './FrequencyAnalysis';

const startTime = performance.now();

function reloadPage() {
    window.location.reload();
}

function clock(value){
    if(value/10<1){
        return '0'+value;
    }else{
        return value;
    }
}

function draw({millis,wave,waveChara,setWaveChara,selectedInput,setSelectedInput}){
    return(
        <>
            <header>
                <div className="head-field">
                    <h1 className="top" onClick={reloadPage}>WaveAnalyzer</h1>
                    {["Wave"].includes(selectedInput) && (
                        <WaveCharaDisplay waveChara={waveChara} setWaveChara={setWaveChara} />
                    )}
                    <DrawInput selected={selectedInput} onChange={setSelectedInput}/>
                </div>
            </header>
            <div>
                <AnalyseFrequency wave={wave} waveChara={waveChara}/>
                <DrawWave wave={wave} waveChara={waveChara}/>
                <div>
                    <h4 className='center'>
                        {clock(Math.round((millis)/60000)%100)}:
                        {clock(Math.round((millis)/1000)%60)}:
                        {clock(Math.round((millis)/10)%100)}
                    </h4>
                </div>
            </div>
        </>
    );
}

export default function App(){
    const[selectedInput,setSelectedInput]=useState("Wave");
    const[waveChara,setWaveChara]=useState([1024,2000,44100,0,"Mute"]);
    const millis = performance.now()-startTime;
    
    let wave=[];
    if(selectedInput==="Wave"){
        wave=generate(millis,waveChara);
    }else{
        wave=new Array(generate(millis, waveChara).length).fill(0);
    }
    return draw({millis,wave,waveChara,setWaveChara,selectedInput,setSelectedInput, });
}