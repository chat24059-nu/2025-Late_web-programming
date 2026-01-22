const inputSource=["Internal","MIC"]

const PulldownMenu=({selected,onChange})=>{
    return (
        <select className="inputSelect" value={selected} onChange={(e)=>onChange(e.target.value)}>
            {inputSource.map((item)=>{
                return <option key={item} value={item}>{item}</option>;
            })}
        </select>
    );
};

export default function DrawInput({selected,onChange}){
    return(
        <>
            <h2>InputSource: <PulldownMenu selected={selected} onChange={onChange}/></h2>
        </>
    );
}