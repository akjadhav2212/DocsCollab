import Quill from 'quill'
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';
export const Editor = ()=>{
    const id = window.location.pathname.split("/")[2]; 
    const quillRef = useRef(null);
    useEffect(()=>{
        const socket = io("https://docscollab.onrender.com");
        const quill = new Quill(quillRef.current, {
            theme: 'snow'
        });
        quill.on('text-change',(delta, oldDelta, source)=>{
            if(source!=="user")return;
            socket.emit('send-changes',delta)
        })
        socket.emit('get-document',id);
        socket.on('load-document',data=>{
            quill.setContents(data);
        });
        
        socket.on('receive-changes',delta =>{
            quill.updateContents(delta);
        })
        setInterval(()=>{
            socket.emit('save-changes',quill.getContents())
        })
        return ()=>{quillRef.current=null;socket.disconnect();quill.off('text-change')}
    },[])
    const[buttontext, setButtonText]= useState("Copy to clipboard");
    return (<>
        <div className='flex flex-col items-center justify-center'>
            <h3>{id}</h3>
            <button className='border-2 border-black rounded-md p-4' onClick={(e)=>{
                navigator.clipboard.writeText(id);
                setButtonText("Copied to clipboard");
                setTimeout(()=>{setButtonText("Copy to clipboard")},2000);
                }}>{buttontext}</button>
        </div>
        <div className='mx-20 mt-10 w-3/4'>
        <div  ref={quillRef}></div>
        </div>
        
    </>)
}