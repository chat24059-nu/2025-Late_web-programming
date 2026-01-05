import {useState,useEffect } from 'react';

const DrawWave = ({input=[]}) => {
    let [width,setWidth]=useState(window.innerWidth)
    let height=200
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const lines = [];
    let [size,zoom] = useState(1);
    for(let i=0; i<=input.length ;i+=size){
        const x=width/input.length*i;
        const y=height/2.0;
        lines.push(
            <line key={x}
                x1={x}
                y1={y}
                x2={x}
                y2={y*(1-input[i])}
                style={{ stroke: 'lightblue', strokeWidth: 1 }}
            />
        );
    }

    return (
        <svg width={width} height={height} style={{ border: "1px solid black" }}>
            {lines}
            <line x1="0" y1="0" x2={width} y2="0" style={{ stroke: 'white', strokeWidth: 2 }}/>
            <line x1="0" y1={height/2} x2={width} y2={height/2} style={{ stroke: 'white', strokeWidth: 0.5 }}/>
            <line x1="0" y1={height} x2={width} y2={height} style={{ stroke: 'white', strokeWidth: 2 }}/>
        </svg>
    );
};

export default DrawWave;