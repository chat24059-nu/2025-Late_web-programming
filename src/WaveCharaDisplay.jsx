const waveForm=["Mute","Sin","Square","Saw"]

const PulldownMenu = ({selected,onChange}) => {
  return (
    <select className="inputSelect" value={selected} onChange={(e) => onChange(e.target.value)}>
      {waveForm.map((item) => {
        return <option key={item} value={item}>{item}</option>;
      })}
    </select>
  );
};

const SpinBox=({value,onChange,min,max,step=1})=>{
  return(
    <input
      type="number"
      value={value}
      onChange={(e)=>onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className="inputSelect"
      style={{width:"80px"}}
    />
  );
};

export default function WaveCharaDisplay({waveChara,setWaveChara}){
    const handleChange=(index,newValue)=>{
        const newChara=[...waveChara];
        newChara[index]=newValue;
        setWaveChara(newChara);
    };
    return(
        <h2>len:<SpinBox value={waveChara[0]} onChange={(value)=>handleChange(0,value)} min={100} max={1000}/>{" "}
        freq:<SpinBox value={waveChara[1]} onChange={(value)=>handleChange(1,value)} min={1} max={waveChara[2]/2}/>{" "}
        rate:<SpinBox value={waveChara[2]} onChange={(value)=>handleChange(2,value)} min={waveChara[3]*2} max={96000}/>{" "}
        amp:<SpinBox value={waveChara[3]} onChange={(value)=>handleChange(3,value)} min={-128} max={6}/>{" "}
        form:<PulldownMenu item={waveChara[4]} onChange={(value)=>handleChange(4,value)}/></h2>
    );
}