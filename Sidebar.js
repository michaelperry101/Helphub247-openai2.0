'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Sidebar(){
  const [chats, setChats] = useState([])
  useEffect(()=>{ setChats(JSON.parse(localStorage.getItem('hh_chats')||'[]')) },[])

  const newChat = ()=>{
    const id = String(Date.now())
    const list = [{id, title:'New chat', createdAt:new Date().toISOString()}, ...(JSON.parse(localStorage.getItem('hh_chats')||'[]'))]
    localStorage.setItem('hh_chats', JSON.stringify(list))
    localStorage.setItem('hh_activeChat', id)
    window.location.href = '/chat'
  }

  const toggle = ()=> document.querySelector('.sidebar')?.classList.toggle('open')

  return (
    <aside className="sidebar">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
        <button onClick={newChat} className="btn btn-primary">+ New chat</button>
        <button onClick={toggle} className="btn" aria-label="Toggle menu">☰</button>
      </div>
      <nav style={{display:'flex',flexDirection:'column',gap:8}}>
        <Link href="/chat">Chat</Link>
        <Link href="/reviews">Reviews</Link>
        <Link href="/about">About Carys</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
      </nav>
      <div style={{marginTop:16,fontSize:12,color:'#94a3b8'}}>© {new Date().getFullYear()} Helphub247</div>
    </aside>
  )
}
