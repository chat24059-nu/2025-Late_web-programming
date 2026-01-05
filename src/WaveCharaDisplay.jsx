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

export default function WaveCharaDisplay({waveChara,setWaveChara}){
    const handleFormChange=(newForm)=>{
        const newChara=[...waveChara];
        newChara[4]=newForm;
        setWaveChara(newChara);
    };
    return(
        <h2>len:{waveChara[0]} freq:{waveChara[1]} rate:{waveChara[2]} amp:{waveChara[3]} form:
        <PulldownMenu item={waveChara[4]} onChange={handleFormChange}/></h2>
    );
}