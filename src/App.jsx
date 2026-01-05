import {useState} from 'react'
import Menu from "./menu"
import DrawInput from "./inputSource";
import DrawWave from "./drawWave";
import WaveCharaDisplay from "./WaveCharaDisplay"
import {sinWave, squareWave, sawtoothWave,} from "./generateWave";
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
    const[selectedInput, setSelectedInput]=useState("Sin");
    const[waveChara,setWaveChara]=useState([1000,2,100,0])
    let wave=[0];
    if(selectedInput=="Sin"){
        wave=sinWave([millis,waveChara]);
    }else if(selectedInput=="Square"){
        wave=squareWave([millis,waveChara])
    }else if(selectedInput=="Saw"){
        wave=sawtoothWave([millis,waveChara]);
    }
    return(
        <>
            <header>
                <div className="head-field">
                    <t1 onClick={reloadPage}>AudioAnalyzer</t1>
                    {["Sin", "Square", "Saw"].includes(selectedInput) && (
                        <WaveCharaDisplay waveChara={waveChara} onChange={setWaveChara} />
                    )}
                    <DrawInput selected={selectedInput} onChange={setSelectedInput}/>
                </div>
            </header>
            <div>
                <AnalyseFrequency wave={wave} waveChara={waveChara}/>
                <DrawWave input={wave}/>
                <div>
                    <h4 className='center'>
                        {clock(Math.round((millis)/60000)%60)}:{clock(Math.round((millis)/1000)%60)}:{clock(Math.round((millis)/10)%100)}
                    </h4>
                </div>
            </div>
        </>
    );
}