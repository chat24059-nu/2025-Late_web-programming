import {useState} from 'react'
import DrawInput from "./inputSource";
import DrawWave from "./drawWave";
import WaveCharaDisplay from "./WaveCharaDisplay"
import {useGenerate} from "./generateWave";
import AnalyseFrequency from './FrequencyAnalysis';
import VolMeter from "./DisplayVol";
import {useMicWave} from './WebAudio';

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
                    <WaveCharaDisplay waveChara={waveChara} setWaveChara={setWaveChara} />
                    <DrawInput selected={selectedInput} onChange={setSelectedInput}/>
                </div>
            </header>
            <div>
                <div className="head-field">
                    <AnalyseFrequency wave={wave} waveChara={waveChara}/>
                    <VolMeter wave={wave}/>
                </div>
                <DrawWave wave={wave}/>
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
    const[selectedInput,setSelectedInput]=useState("Internal");
    const[waveChara,setWaveChara]=useState([1024,2000,44100,0,"Mute"]);
    const millis = performance.now()-startTime;
    const internal=useGenerate(millis,waveChara);
    const mic=useMicWave(waveChara[0]);
    
    let wave = new Float32Array(waveChara[0]);
    if(selectedInput==="Internal"){
        wave=internal;
    }else{
        let vol=Math.pow(10,waveChara[3]/20);
        wave=mic.map(value=>Math.max(-1,Math.min(value*vol,1)));
    }
    return draw({millis,wave,waveChara,setWaveChara,selectedInput,setSelectedInput, });
}