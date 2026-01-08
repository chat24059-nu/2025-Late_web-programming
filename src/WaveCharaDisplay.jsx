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

const SpinBox = ({ value, onChange, min, max, step = 1 }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;

    // 空文字はスキップ（入力中の一時的な状態）
    if (newValue === '') return;

    const num = Number(newValue);

    // 数値でない or 範囲外ならスキップ
    if (isNaN(num) || (min !== undefined && num < min) || (max !== undefined && num > max)) {
      return;
    }

    onChange(num);
  };

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
      className="inputSelect"
      style={{ width: '80px' }}
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
        <h2>len:<SpinBox value={waveChara[0]} onChange={(value)=>handleChange(0,value)} min={32} max={1024}/>{" "}
        freq:<SpinBox value={waveChara[1]} onChange={(value)=>handleChange(1,value)} min={0} max={Math.min(20000,Math.ceil(waveChara[2]/2)-1)}/>{" "}
        rate:<SpinBox value={waveChara[2]} onChange={(value)=>handleChange(2,value)} min={waveChara[1]*2} max={48000}/>{" "}
        amp:<SpinBox value={waveChara[3]} onChange={(value)=>handleChange(3,value)} min={-128} max={12}/>{" "}
        form:<PulldownMenu value={waveChara[4]} onChange={(value)=>handleChange(4,value)}/></h2>
    );
}