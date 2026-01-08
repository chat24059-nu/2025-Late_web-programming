import {useEffect,useState} from "react";
import FFT from "fft.js";

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
    let N=Math.pow(2, Math.floor(Math.log2(Math.min(wave.length,waveChara[2]))));
    const fft = new FFT(N);
    const input=new Float32Array(N);
    const comp=fft.createComplexArray();
    for(let i=0;i<N;i++){
        input[i]=wave[wave.length-1-i];
    }
    fft.realTransform(comp,input);
    fft.completeSpectrum(comp);
    for(let i=1;i<N/2;i++){
        const x=i/(Math.ceil(N/2))*width;
        const lev=euclid(comp[2*i],comp[2*i+1]);
        lines.push(
            <line key={i}
                x1={x}
                y1={height}
                x2={x}
                y2={height-300*lev/N}
                style={{ stroke: "lightblue", strokeWidth: 2*width/N}}
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