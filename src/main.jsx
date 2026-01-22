import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.querySelector("#content")).render(<App />);
if(process.env.NODE_ENV!=='development'){
    console.log=()=>{};
    console.warn=()=>{};
    console.error=()=>{};
}