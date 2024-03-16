import {v4 as uuid} from 'uuid'
import { useState } from 'react';
export const Home = ()=>{
    const[uu_id, setUuid] = useState("Generate  New UUid");
    const[message, setMessage] = useState("");
    const[inputUuid, setInputUuid]  = useState("");
    let timer;
    const generateUuid = ()=>{
        clearTimeout(timer);
        setMessage("");
        const id = uuid();
        setUuid(id);
        navigator.clipboard.writeText(id).then(()=>{
            setMessage("Copied to clipboard");
            timer = setTimeout(()=>{setMessage("")},2000);
        })
    }
    const handler = ()=>{
        if(inputUuid){
            window.location.href = `/editor/${inputUuid}`;
        }
    }
    return (<>
        <div className='flex flex-col justify-center items-center border-2'>  
            <h3>{uu_id}</h3>
            <h6>{message}</h6>
            <button className='border-2 border-black rounded-md my-2 p-2' onClick={generateUuid}>Generate UUID</button>
        </div>
        <div className='flex flex-col justify-center items-center border-2'>  
            <input onChange={(e)=>{setInputUuid(e.target.value)}} type='text' placeholder='Enter the UUID to join' ></input>
            <button className='border-2 border-black rounded-md my-2 p-2' onClick={handler}>Enter the document</button>
        </div>
    </>)
}