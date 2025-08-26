import ReviewCard from '../../components/ReviewCard'
import reviews from '../../data/reviews.json'
export default function Reviews({ searchParams }){
  const page = parseInt(searchParams?.page || '1',10)
  const per = 18
  const start = (page-1)*per
  const items = reviews.slice(start, start+per)
  const totalPages = Math.ceil(reviews.length / per)
  return (
    <div>
      <h1>Customer reviews</h1>
      <div className='review-grid' style={{marginTop:12}}>
        {items.map((r,i)=>(<ReviewCard key={i} review={r}/>))}
      </div>
      <div style={{marginTop:12,display:'flex',justifyContent:'center',gap:8'}}>
        <a className='btn' href={`?page=${Math.max(1,page-1)}`}>Prev</a>
        <span>Page {page} / {totalPages}</span>
        <a className='btn' href={`?page=${Math.min(totalPages,page+1)}`}>Next</a>
      </div>
    </div>
  )
}
