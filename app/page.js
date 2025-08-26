'use client'
import {useState} from 'react'
export default function Subscribe(){
  const [ok,setOk]=useState(false)
  return (
    <div className='card' style={{maxWidth:640,margin:'16px auto',textAlign:'center'}}>
      <h2>Subscribe to Helphub247</h2>
      <p>£9.99 / month — demo checkout. Replace with Stripe Checkout for live payments.</p>
      {!ok ? <button onClick={()=>setOk(true)} className='btn btn-primary' style={{marginTop:12}}>Subscribe (Demo)</button> : <div style={{color:'#16a34a'}}>Subscribed (demo)</div>}
    </div>
  )
}
