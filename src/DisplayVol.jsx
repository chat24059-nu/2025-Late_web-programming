export default function VolMeter({wave}){
    const bufSize=Math.min(wave.length,512);
    let sqSum=0;
    for(let i=0;i<bufSize;i++){
        sqSum+=Math.pow(wave[wave.length-i-1],2);
    }
    const RMS=Math.sqrt(sqSum/bufSize);
    const width=100;
    const height=300;

    const marks=[];
    for(let i=-3;i>=-12;i*=2){
        const y=height*(1-Math.pow(10,i/20));
        marks.push(
            <line key={i} x1={0} y1={y} x2={width} y2={y} style={{stroke:'white',strokeWidth:0.25}}/>
        )
    }
    return (
        <svg width={width} height={height} style={{ border: "1px solid black" }}>
            <line x1={width/2} y1={height} x2={width/2} y2={height*(1-RMS)} style={{stroke:'lightblue',strokeWidth:50}}/>
            {marks}
            <rect x={0} y={0} width={width} height={height} style={{stroke:'white',strokeWidth:2,fill:'none'}}/>
        </svg>
    );
}