'use client'
import {useEffect, useState} from 'react'
export default function Settings(){
  const [theme,setTheme] = useState(localStorage.getItem('hh_theme')||'light')
  useEffect(()=>{ localStorage.setItem('hh_theme', theme); document.documentElement.classList.toggle('dark', theme==='dark') },[theme])
  return (
    <div className='card' style={{maxWidth:720,margin:'16px auto'}}>
      <h2>Settings</h2>
      <div style={{marginTop:12}}>
        <label style={{display:'flex',gap:8,alignItems:'center'}}><input type='checkbox' checked={theme==='dark'} onChange={()=>setTheme(t=>t==='dark'?'light':'dark')} /> Dark mode</label>
      </div>
    </div>
  )
}
