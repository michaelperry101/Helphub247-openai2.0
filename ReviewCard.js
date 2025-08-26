export default function ReviewCard({ review }){
  return (
    <div className='card'>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:700}}>{review.name}</div>
        <div style={{color:'#f59e0b'}}>★★★★★</div>
      </div>
      <p style={{marginTop:8,color:'#475569'}}>{review.text}</p>
      <div style={{marginTop:8,fontSize:12,color:'#94a3b8'}}>{review.date} • {review.location}</div>
    </div>
  )
}
