import {useEffect,useState} from "react";

function euclid(a,b){
    return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
}

export default function AnalyseFrequency({wave=[],waveChara=[]}){
    let [width,setWidth]=useState(window.innerWidth/2);
    let height=300;
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth/2);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const lines=[];
    let [size,zoom]=useState(1)
    let N=Math.min(waveChara[0],waveChara[2]);

    for(let i=1;i<=waveChara[2]/2;i++){
        const x=i/(waveChara[2]/2.0+1)*width;
        let real=0;
        let imag=0;
        const e=-2*Math.PI*i/waveChara[2];
        for(let j=0;j<N;j++){
            real+=wave[waveChara[0]-1-j]*Math.cos(e*j);
            imag+=wave[waveChara[0]-1-j]*Math.sin(e*j);
        }
        const lev=euclid(real,imag);
        lines.push(
            <line key={x}
                x1={x}
                y1={height}
                x2={x}
                y2={height-300*lev/N}
                style={{ stroke: "lightblue", strokeWidth: width/(waveChara[2]/2.0) }}
            />
        );
    }

    return (
        <svg width={width} height={height} style={{ border: "1px solid black" }}>
            {lines}
            <rect x={0} y={0} width={width} height={height} style={{stroke:'white',strokeWidth:2,fill:'none'}}/>
        </svg>
    );
}