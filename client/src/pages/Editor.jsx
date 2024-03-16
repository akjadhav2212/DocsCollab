import Quill from 'quill'
import io from 'socket.io-client'
import { useEffect, useRef } from 'react';
export const Editor = ()=>{
    const id = window.location.pathname.split("/")[2]; 
    const quillRef = useRef(null);
    useEffect(()=>{
        const socket = io("ws://localhost:3000");
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

    return (<>
        <div className='mx-20 mt-10 w-3/4'>
        <div  ref={quillRef}></div>
        </div>
        
    </>)
}