'use client'
import {useEffect,useRef,useState} from 'react'

export default function ChatWindow(){
  const [messages,setMessages] = useState([])
  const [text,setText] = useState('')
  const [files,setFiles] = useState([])
  const [chatId,setChatId] = useState(null)
  const [busy,setBusy] = useState(false)
  const boxRef = useRef(null)

  useEffect(()=>{
    let id = localStorage.getItem('hh_activeChat')
    if(!id){
      id = String(Date.now()); localStorage.setItem('hh_activeChat', id);
      const list = JSON.parse(localStorage.getItem('hh_chats')||'[]'); list.unshift({id,title:'New chat',createdAt:new Date().toISOString()}); localStorage.setItem('hh_chats', JSON.stringify(list))
    }
    setChatId(id)
    const saved = JSON.parse(localStorage.getItem('chat:'+id)||'[]')
    setMessages(saved)
  },[])

  useEffect(()=>{ boxRef.current?.scrollTo({top:1e9, behavior:'smooth'}) },[messages])

  const speak = (txt)=>{
    try{
      const u = new SpeechSynthesisUtterance(txt); u.lang='en-GB'; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u)
    }catch(e){}
  }

  const send = async ()=>{
    if(!text.trim() && files.length===0) return
    const user = { role:'user', content:text, files: files.map(f=>({name:f.name,size:f.size})) }
    const next = [...messages, user]
    setMessages(next); setText(''); setFiles([]); localStorage.setItem('chat:'+chatId, JSON.stringify(next))
    setBusy(true)
    try{
      // send to API - supports JSON messages; files are not uploaded in this demo to keep build simple
      const res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ messages: next }) })
      const js = await res.json()
      const reply = { role:'assistant', content: js.reply || ('Carys (demo): ' + text) }
      const next2 = [...next, reply]
      setMessages(next2); localStorage.setItem('chat:'+chatId, JSON.stringify(next2))
      speak(reply.content)
    }catch(e){
      const reply = { role:'assistant', content: 'Carys cannot reach the server right now.' }
      const next2 = [...next, reply]; setMessages(next2); localStorage.setItem('chat:'+chatId, JSON.stringify(next2))
    }finally{ setBusy(false) }
  }

  const handleFiles = (e)=> setFiles(Array.from(e.target.files||[]))

  const startSTT = ()=>{
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if(!SR){ alert('Speech recognition not supported'); return }
    const r = new SR(); r.lang='en-GB'; r.interimResults=false; r.onresult = (ev)=> setText(prev => (prev?prev+' ':'') + ev.results[0][0].transcript); r.start()
  }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'80vh'}}>
      <div ref={boxRef} style={{flex:1,overflowY:'auto',padding:8}}>
        {messages.length===0 && <div style={{textAlign:'center',color:'#6b7280'}}>Start a conversation with Carys.</div>}
        <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:8}}>
          {messages.map((m,i)=>(
            <div key={i} style={{alignSelf: m.role==='user'?'flex-end':'flex-start',maxWidth:'80%'}}>
              <div style={{padding:10,borderRadius:12,background: m.role==='user'?'#0ea5a4':'#f1f5f9',color: m.role==='user'?'#fff':'#0f172a'}}>{m.content}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <label htmlFor="file" style={{padding:'8px 10px',borderRadius:8,border:'1px solid #e6edf3',cursor:'pointer'}}>Upload</label>
        <input id="file" type="file" multiple onChange={handleFiles} style={{display:'none'}} />
        <button onClick={startSTT} style={{padding:'8px 10px',borderRadius:8,border:'1px solid #e6edf3'}}>🎙️</button>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Message Carys..." style={{flex:1,padding:10,borderRadius:8,minHeight:48}}></textarea>
        <button onClick={send} className="btn btn-primary">{busy? '…' : 'Send'}</button>
      </div>
    </div>
  )
}
