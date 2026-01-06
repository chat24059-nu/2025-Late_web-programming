import {useState} from 'react'
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

export default function App(){
    let millis = performance.now()-startTime;
    const[selectedInput,setSelectedInput]=useState("Wave");
    const[waveChara,setWaveChara]=useState([500,20,250,0,"Mute"])
    let wave=[];
    if(selectedInput==="Wave"){
        wave=generate([millis,waveChara]);
    }else{
        wave=new Array(generate([millis, waveChara]).length).fill(0);
    }
    return(
        <>
            <header>
                <div className="head-field">
                    <t1 onClick={reloadPage}>WaveAnalyzer</t1>
                    {["Wave"].includes(selectedInput) && (
                        <WaveCharaDisplay waveChara={waveChara} setWaveChara={setWaveChara} />
                    )}
                    <DrawInput selected={selectedInput} onChange={setSelectedInput}/>
                </div>
            </header>
            <div>
                <AnalyseFrequency wave={wave} waveChara={waveChara}/>
                <DrawWave input={wave}/>
                <div>
                    <h4 className='center'>
                        {clock(Math.round((millis)/60000)%100)}:{clock(Math.round((millis)/1000)%60)}:{clock(Math.round((millis)/10)%100)}
                    </h4>
                </div>
            </div>
        </>
    );
}