export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { prompt } = req.body || {}
  const key = process.env.OPENAI_API_KEY
  if(!key) return res.status(200).json({ imageBase64: null })
  try{
    const r = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST', headers: {'Content-Type':'application/json','Authorization':`Bearer ${key}`},
      body: JSON.stringify({ prompt, size: '1024x1024' })
    })
    const j = await r.json()
    const b64 = j?.data?.[0]?.b64_json
    return res.status(200).json({ imageBase64: b64 })
  }catch(e){
    return res.status(500).json({ error: 'Image creation failed' })
  }
}
