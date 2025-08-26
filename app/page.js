import Link from 'next/link'
export default function Home(){
  return (
    <div style={{maxWidth:900,margin:'24px auto'}}>
      <div className='card'>
        <h1 style={{fontSize:28,fontWeight:800}}>Helphub247 — <span style={{color:'#0ea5a4'}}>CARYS</span></h1>
        <p style={{color:'#475569',marginTop:8}}>24/7 AI helpline for UK customers. Chat, upload files and get answers fast. GDPR-focused.</p>
        <div style={{marginTop:16,display:'flex',gap:8}}>
          <Link href="/chat"><button className="btn btn-primary">Open Carys</button></Link>
          <Link href="/subscribe"><button className="btn" style={{border:'1px solid #e6edf3'}}>Subscribe</button></Link>
        </div>
      </div>
    </div>
  )
}
